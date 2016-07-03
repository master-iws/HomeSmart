app.controller("SmartHomeProgramCtrl", ["$scope", "$resource", "$location", "$http", "$compile", "dataset", "detailsTemplate", "$filter", "menuService",
    function ($scope, $resource, $location, $http, $compile, dataset, detailsTemplate, $filter, menuService) {
        $scope.location = $location;
        $scope.profiles = dataset.data.temperatureProfiles;
        $scope.detailTemplate = detailsTemplate.data;
        $scope.currentProfile = null;
        $scope.currentProfileOld = null;
        $scope.currentFacility = null;
        $scope.temperatureFacilitySettings = null; // Objekt für TemperaturProfil bei Wochenprogrammen
        $scope.currentInterval = null;
        $scope.currentBlock = 100;
        $scope.currentBlockObject = null;
        $scope.nextInterval = null;
        $scope.currentlyDropping = false;
        $scope.newBlockArray = [];
        $scope.movedBlockIndex = null;
        $scope.newProgramDivVisible = false;
        $scope.newProfileName = "";
        $scope.changeRoute = false;
        $scope.showHelp = false;
        $scope.saveIcon = "images/icons/save-26.png";
        $scope.thisMenu = menuService.smarthomeMenu();
        $scope.$parent.currentModule = $scope.thisMenu;
        $scope.name = "smarthome";
        $scope.setActive = function (block) {
            if ($scope.currentBlock === block) {
                return "active";
            }
            else {
                return "";
            }
        };
        $scope.loadProfiles = function () {
            $scope.profileQuery = $resource('/msw/api/smarthome/profiles', {callback: 'JSON_CALLBACK'});
            $scope.profileQuery.get({callback: 'JSON_CALLBACK'}, function (data) {
                //loaded:
                $scope.profiles = data.temperatureProfiles;
                for (var i = 0; i < $scope.profiles.length; i++) {
                    if ($scope.profiles[i].active) {
                        $scope.editProfile($scope.profiles[i]);
                        break;
                    }
                }
                $scope.safeApply();
            });
        };
        $scope.filterFacilities = function (facility) {
            return (facility.controllable && typeof facility.edit === "undefined");
        };
        $scope.filterBlocks = function (block) {
            if (block.days.length === 0 && $scope.currentBlock === block.blockId) {
                $scope.setCurrentBlockToBlockWithDays();
            }
            return block.days.length > 0;
        };
        $scope.setCurrentBlockToBlockWithDays = function () {
            for (var i = 0; i < $scope.currentProfile.facilityProfiles[0].blocks.length; i++) {
                if ($scope.currentProfile.facilityProfiles[0].blocks[i].days.length > 0) {
                    $scope.currentBlock = $scope.currentProfile.facilityProfiles[i].blocks[i].blockId;
                    break;
                }
            }
        };
        $scope.startDrop = function () {
            $scope.currentlyDropping = $scope.currentProfile.facilityProfiles[i].blocks.length < 7;
            $scope.safeApply();
        };
        $scope.stopDrop = function () {
            $scope.currentlyDropping = false;
            $scope.safeApply();
        };
        $scope.dropNewInterval = function () {
        };
        $scope.editProfile = function (profile) {
            $http.get('/msw/api/smarthome/temperatures')
                    .success(function (data) {
                        $scope.temperatureFacilitySettings = data.temperatureFaciliySettings;
                    });
            if ($scope.currentProfileOld === null) {
                $scope.currentProfile = profile;
                $scope.currentProfileOld = angular.copy($scope.currentProfile);
                $scope.filterBlock(100);
            }
            else {
                $scope.showUnsavedInfo($scope.saveChange, function (n) {
                    $scope.currentProfile = profile;
                    $scope.currentProfileOld = angular.copy($scope.currentProfile);
                    $scope.filterBlock(100);
                    $scope.safeApply();
                }, "");
            }
        };
        $scope.getTemperatureByTemperatureFacilitySettings = function (block, i, facility) {
            var intervalID = $scope.getIntervalIDByBegin(block, i);
            var currentInterval = block.intervals[intervalID];
            var nInterval = block.intervals[intervalID + 1];
            var returnVal = '';
            var sizeLong = 12;
            var sizeShort = 7;
            if (screen.width < 1100) {
                sizeLong = 14;
                sizeShort = 9;

            }
            else if (screen.width < 960) {
                sizeLong = 16;
                sizeShort = 11;

            }
            if (typeof nInterval === "undefined") {
                nInterval = {
                    intervalFrom: 96
                };
            }
            var intervalLength = nInterval.intervalFrom - currentInterval.intervalFrom;
            if ($scope.isPlug(currentInterval)) {
                if (intervalLength > 6) {
                    return (currentInterval.powerOn ? "ON" : "OFF");
                }
                else {
                    return "";
                }
            }
            else if (intervalLength > sizeLong) {
                if (currentInterval.mode === 103) {
                    if (currentInterval.manualTemp < 5) {
                        returnVal = $scope.getModeByInt(103) + '\nOFF';
                    }
                    else if (currentInterval.manualTemp > 30) {
                        returnVal = $scope.getModeByInt(103) + '\nON';
                    }
                    else {
                        returnVal = $scope.getModeByInt(103) + '\n' + currentInterval.manualTemp + '°C';
                    }
                }
                else {
                    angular.forEach($scope.temperatureFacilitySettings, function (temperatureFacilitySetting) {
                        if (temperatureFacilitySetting.facId === facility.facId) {

                            angular.forEach(temperatureFacilitySetting.temperatureSettings, function (temperatureSetting) {
                                if (temperatureSetting.temperatureMode === currentInterval.mode) {
                                    returnVal = $scope.getModeByInt(temperatureSetting.temperatureMode) + '\n' + temperatureSetting.temperature + '°C';
                                }
                            });
                        }

                    });
                }
            }
            else if (intervalLength > sizeShort) {
                if (currentInterval.mode === 103) {
                    returnVal = $scope.getModeByInt(103).substr(0, intervalLength - 5) + '\u2026\n' + currentInterval.manualTemp + '°C';
                }
                else {
                    angular.forEach($scope.temperatureFacilitySettings, function (temperatureFacilitySetting) {
                        if (temperatureFacilitySetting.facId === facility.facId) {

                            angular.forEach(temperatureFacilitySetting.temperatureSettings, function (temperatureSetting) {
                                if (temperatureSetting.temperatureMode === currentInterval.mode) {
                                    var name = $scope.getModeByInt(temperatureSetting.temperatureMode);
                                    returnVal = name.substr(0, intervalLength - 5) + (name.length > intervalLength - 5 ? '\u2026\n' : '\n') + temperatureSetting.temperature + '°C';
                                }
                            });
                        }

                    });
                }
            }
            else {
                returnVal = "";
            }


            return returnVal;
        };
        $scope.getModeByInt = function (integer) {
            var returnVal = "";
            switch (integer) {
                case 100:
                    returnVal = "ABSENK";
                    break;
                case 101:
                    returnVal = "ECO";
                    break;
                case 102:
                    returnVal = "KOMFORT";
                    break;
                case 103:
                    returnVal = "MANUELL";
                    break;
                case null:
                    returnVal = "N/A";
                    break;
            }
            return returnVal;
        };
        $scope.filterBlock = function (id) {
            $scope.clean();
            $scope.currentBlock = id;
        };
        $scope.clean = function () {
            $(".dayProgram").find("*").poshytip('disable');
            $("*").poshytip('disable');
            $(".tip-twitter-dark").remove();
            $(".tip-twitter").remove();
            //$("*").poshytip('enable');
        };
        $scope.getDayIndex = function (dayarray, value) {
            for (var i = 0; i < dayarray.length; i++) {
                if (dayarray[i] === value) {
                    return i;
                }
            }
        };
        $scope.getBlockIndex = function (blockarray, id) {
            for (var i = 0; i < blockarray.length; i++) {
                if (blockarray[i].blockId === id) {
                    return i;
                }
            }
            return null;
        };
        $scope.getFacilityIndex = function (facarray, id) {
            for (var i = 0; i < facarray.length; i++) {
                if (facarray[i].facId === id) {
                    return i;
                }
            }
            return null;
        };

        $scope.splitInterval = function (currentInterval, pos) {
            $scope.clean();
            var intervalID = $scope.getIntervalIDByBegin($scope.currentBlockObject, pos);
            var currentIntervalBegin = $scope.currentBlockObject.intervals[intervalID].intervalFrom;
            var nextIntervalBegin = 96;
            if ($scope.currentBlockObject.intervals.length > intervalID + 1) {
                nextIntervalBegin = $scope.currentBlockObject.intervals[intervalID + 1].intervalFrom;
            }

            if (nextIntervalBegin - currentIntervalBegin === 1) {
                smoke.signal("Dieses Interval ist zu kurz um geteilt werden zu können.");
            }
            else if ($scope.currentBlockObject.intervals.length === 13) {
                smoke.signal("Hardwarebedingt können maximal 13 Intervalle pro Raum hinterlegt werden.");
            }
            else {
                if (pos === currentIntervalBegin) {
                    pos++;
                }
                $scope.currentBlockObject.intervals.push({
                    tempIntervalId: 0,
                    intervalFrom: pos,
                    mode: 103,
                    powerOn: $scope.isPlug(currentInterval),
                    powerOff: false,
                    manualTemp: 21,
                    newInterval: true,
                    size: 0
                });
                $scope.currentBlockObject.intervals.sort(function (a, b) {
                    return a.intervalFrom - b.intervalFrom;
                });
            }

        };
        $scope.addInterval = function (block) {
            $scope.clean();
            var lastInterval = block.intervals[block.intervals.length - 1];
            var newIntervalStart = Math.floor((96 - lastInterval.intervalFrom) / 2 + lastInterval.intervalFrom);
            if (lastInterval.intervalFrom > 94) {
                smoke.signal("Es kann kein Interval mehr angehängt werden, bitte zunächst die vorangehenden Intervalle verteilen.");
            }
            else if (block.intervals.length === 13) {
                smoke.signal("Hardwarebedingt können maximal 13 Intervalle pro Raum hinterlegt werden.");
            }
            else {
                block.intervals.push({
                    tempIntervalId: 0,
                    intervalFrom: newIntervalStart,
                    mode: 103,
                    manualTemp: 21,
                    newInterval: true,
                    size: 0
                });
            }
        };
        $scope.deleteInterval = function (interval) {
            if ($scope.currentBlockObject.intervals.length === 1) {
                smoke.signal('Das erste Interval kann nicht gelöscht werden.');
            }
            else {
                var i = $scope.currentBlockObject.intervals.indexOf(interval);
                if (i === 0) {
                    smoke.signal('Das erste Interval kann nicht gelöscht werden.');
                }
                else {
                    $scope.clean();
                    $scope.currentBlockObject.intervals.splice(i, 1);
                }
            }
        };
        $scope.isPlug = function (interval) {
            return interval.powerOn || interval.powerOff;
        };
        $scope.getMode = function (interval) {
            if ($scope.isPlug(interval)) {
                if (interval.powerOn && !interval.powerOff) {
                    return "socketStateOn";
                }
                else if (!interval.powerOn && interval.powerOff) {
                    return "socketStateOff";
                }
                else {
                    return "";
                }
            }
            else {
                switch (interval.mode) {
                    case 100:
                        return "lightblue";
                        break;
                    case 101:
                        return "green";
                        break;
                    case 102:
                        return "yellowish";
                        break;
                    case 103:
                        return "redish";
                        break;
                    default:
                        return "dark";
                }
            }
        };
        $scope.getDropClasses = function (block, timeSlot) {
            var interval = $scope.getIntervalIDByBegin(block, timeSlot);
            var activeInterval = "";
            var nextIntervalBegin = 96;
            if (block.intervals.length > interval + 1) {
                nextIntervalBegin = block.intervals[interval + 1].intervalFrom;
            }
            if ($scope.currentInterval === interval) {
                activeInterval = "activeInterval";
            }
            var next = "";
            if (nextIntervalBegin - 1 > timeSlot) {
                next = " interval" + interval;
            }

            return  $scope.getMode(block.intervals[interval]) + next + " interval" + (interval + 1) + " " + activeInterval;
        };
        $scope.setCurrentInterval = function (interval) {
            $scope.currentInterval = interval;
        };
        $scope.showDetails = function (block, i, $event, facility) {
            $scope.currentFacility = facility;
            var element = null;
            if ($event.target.nodeName === "SPAN") {
                element = $($event.target).parent();
            }
            else {
                element = $event.target;
            }

            var intervalID = $scope.getIntervalIDByBegin(block, i);
            $scope.currentBlockObject = block;
            $scope.currentInterval = block.intervals[intervalID];
            $scope.nextInterval = block.intervals[intervalID + 1];
            $scope.clean();
            $(element).poshytip({
                className: 'tip-twitter-dark',
                showTimeout: 0,
                fade: false,
                slide: false,
                offsetX: 0,
                offsetY: -1,
                alignTo: 'target',
                alignX: 'center',
                alignY: 'bottom',
                followCursor: true,
                content: $compile("<p>" + $scope.getTimeFormInterval($scope.currentInterval.intervalFrom) + "-" + (typeof $scope.nextInterval !== "undefined" ? $scope.getTimeFormInterval($scope.nextInterval.intervalFrom) : $scope.getTimeFormInterval(96)) + " Uhr</p>" + $scope.detailTemplate.replace("%index", i))($scope),
                showOn: 'none'
            });
            $(element).poshytip('show');
        };
        $scope.showAdd = function () {
            if ($scope.currentProfile.facilityProfiles.length > 0) {
                for (var i = 0; i < $scope.currentProfile.facilityProfiles[0].blocks.length; i++) {
                    if ($scope.currentProfile.facilityProfiles[0].blocks[i].days.length === 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        $scope.getIntervalIDByBegin = function (block, timeSlot) {
            var i = 0;
            while (typeof block.intervals[i] !== 'undefined' && block.intervals[i].intervalFrom <= timeSlot) {
                i++;
            }
            ;
            return i - 1;
        };
        $scope.getNextIntervalIDByBegin = function (block, timeSlot) {
            var i = 0;
            while (typeof block.intervals[i] !== 'undefined' && block.intervals[i].intervalFrom <= timeSlot) {
                i++;
            }
            ;
            return i;
        };
        $scope.checkIntervalChange = function (block, i) {
            if ($scope.browser.msie && $scope.browser.version < 11) {
                return false;
            }
            else {
                var intervalID = $scope.getIntervalIDByBegin(block, i);
                return block.intervals[intervalID].intervalFrom === i;
            }
        };
        $scope.changeTempMode = function (mode) {
            $scope.currentInterval.mode = mode;
        };
        $scope.changeSwitchMode = function (state) {
            $scope.currentInterval.powerOff = !state;
            $scope.currentInterval.powerOn = state;
        };
        $scope.getDayByInt = function (day) {
            var returnval = "";
            switch (day) {
                case 0:
                    returnval = "Mo";
                    break;
                case 1:
                    returnval = "Di";
                    break;
                case 2:
                    returnval = "Mi";
                    break;
                case 3:
                    returnval = "Do";
                    break;
                case 4:
                    returnval = "Fr";
                    break;
                case 5:
                    returnval = "Sa";
                    break;
                case 6:
                    returnval = "So";
                    break;
                default:
                    returnval = "-";
            }
            return returnval;
        };
        $scope.getTimeFormInterval = function (t1) {
            if (typeof t1 !== 'undefined') {
                var temp = Math.floor(t1 / 4);
                var retT = padLeft(temp) + "";
                switch (t1 % 4) {
                    case 0:
                        retT += ":00";
                        break;
                    case 1:
                        retT += ":15";
                        break;
                    case 2:
                        retT += ":30";
                        break;
                    case 3:
                        retT += ":45";
                        break;
                }
            }
            else {
                retT = "24:00";
            }
            return retT;
        };
        /*$scope.newProfile = function() {
         smoke.prompt("Bitte Namen für neues Wochenprogramm angeben:", function(e) {
         var dataR = {label: e, comment: ""};
         if (e) {
         $http.post('/msw/api/smarthome/profile', dataR, {
         }).success(function() {
         $scope.loadProfiles();
         });
         $scope.safeApply();
         }
         else {
         
         }
         }, {
         ok: "Anlegen",
         cancel: "Abbrechen",
         classname: "custom-class",
         reverseButtons: true,
         value: ""
         });
         };*/
        $scope.createProgram = function (option) {
            if ($scope.newProfileName === "") {
                smoke.alert("Bitte geben Sie einen Namen für das neue Wochenprogramm ein!", function (evt) {
                }, {
                    ok: "Ok"
                });
            }
            else {
                var dataR;
                switch (option) {
                    case 1:
                        dataR = {label: $scope.newProfileName, comment: "", tag: "", templateId: ""};
                        break;
                    case 2:
                        dataR = {label: $scope.newProfileName, comment: "", tag: "", templateId: $scope.currentProfile.profileId};
                        break;
                    case 3:
                        dataR = {label: $scope.newProfileName, comment: "", tag: "comfort", templateId: ""};
                        break;
                    case 4:
                        dataR = {label: $scope.newProfileName, comment: "", tag: "eco", templateId: ""};
                        break;
                    case 5:
                        dataR = {label: $scope.newProfileName, comment: "Autogenerated profile:virtual inhabitant", tag: "", templateId: $scope.currentProfile.profileId};
                        break;
                }

                $http.post('/msw/api/smarthome/profile', dataR, {
                }).success(function () {
                    $scope.loadProfiles();
                }).error(function () {
                    smoke.alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es später erneut!", function (e) {
                    }, {
                        ok: "Ok"
                    });
                });
                $scope.safeApply();
                $scope.newProgramDivVisible = false;
                $scope.newProfileName = "";
            }
        };
        $scope.renameProfile = function () {
            smoke.prompt("Bitte neuen Namen für das aktuelle Wochenprogramm angeben:", function (e) {
                if (e) {
                    $scope.currentProfile.profileLabel = e;
                    $scope.saveChange();
                } else {

                }
            }, {
                ok: "Umbenennen",
                cancel: "Abbrechen",
                classname: "custom-class",
                reverseButtons: true,
                value: $scope.currentProfile.profileLabel
            });
        };
        $scope.deleteProfile = function () {
            if ($scope.currentProfile.active) {
                smoke.signal('Das aktive Profil kann nicht gelöscht werden. Aktivieren Sie vor dem Löschen zunächst ein anderes Profil.');
            }
            else {
                smoke.confirm('Das aktuell ausgewählte Wochenprogramm wirklich löschen?', function (e) {
                    if (e) {
                        $scope.deleteProfileInternal();
                    }
                }, {
                    ok: "Löschen",
                    cancel: "Abbrechen",
                    classname: "custom-class",
                    reverseButtons: true});
            }
        };
        $scope.deleteProfileInternal = function () {
            var dataR = {profileId: $scope.currentProfile.profileId};
            $http.post('/msw/api/smarthome/deleteProfile', dataR, {
                headers: {'Content-Type': 'application/json'}})
                    .success(function () {
                        $scope.currentProfile = null;
                        $scope.currentProfileOld = null;
                        $scope.loadProfiles();
                        $scope.init();
                    }).error(function (data, status, headers, config) {
                smoke.signal('Beim Löschen ist ein Fehler aufgetreten. Bitte erneut versuchen.');
            });
            $scope.safeApply();
        };
        $scope.setStandard = function (profile) {
            $scope.saveChange();
            setTimeout(function () {
                $http.get('/msw/api/smarthome/activateProfile/' + profile.profileId)
                        .success(function () {
                            $scope.loadProfiles();
                            if (localStorage.getItem('showProfileActivationInfo') === "false") {
                                smoke.quiz("Die Aktivierung kann einige Minuten in Anspruch nehmen.", function (evt) {
                                    if (!evt) {
                                        localStorage.setItem('showProfileActivationInfo', true);
                                    }
                                }, {
                                    button_1: "Ok",
                                    button_cancel: "Meldung nicht mehr anzeigen"
                                });
                            }
                        });
            }, 1500);
            $scope.safeApply();
            $scope.checkLastProgramChange();
        };
        $scope.saveChange = function () {
            $scope.saveIcon = "images/icons/saving.gif";
            for (var i = 1; i < $scope.currentProfile.facilityProfiles.length; i++) {
                for (var j = 0; j < $scope.currentProfile.facilityProfiles[i].blocks.length; j++) {
                    if (typeof $scope.currentProfile.facilityProfiles[0].blocks[j] !== "undefined") {
                        $scope.currentProfile.facilityProfiles[i].blocks[j].days = $scope.currentProfile.facilityProfiles[0].blocks[j].days.slice();
                    }
                    else {
                        $scope.currentProfile.facilityProfiles[i].blocks[j].days = [];
                    }
                }
            }
            $scope.currentProfileOld = angular.copy($scope.currentProfile);
            $http({
                method: 'POST',
                url: '/msw/api/smarthome/saveProfile',
                data: $scope.currentProfile
            }).success(function () {
                $scope.saveIcon = "images/icons/checkmark-48.png";
                setTimeout(function () {
                    $scope.saveIcon = "images/icons/save-26.png";
                    $scope.safeApply();
                }, 3000);
            }).error(function (data, status, headers, config) {
                $scope.saveIcon = "images/icons/save-26.png";
                if (status === 403) {
                    smoke.signal("Zugangsdaten nicht mehr gültig. Bitte erneut anmelden.");
                }
                else {
                    smoke.signal('Fehler beim Speichern.');
                }
            });
            $scope.safeApply();
        };
        $scope.sortByDay = function (block) {
            var ret = 99;
            for (var i = 0; i < block.days.length; i++) {
                if (block.days[i] < ret) {
                    ret = block.days[i];
                }
            }
            return ret;
        };
        $scope.init = function () {
            for (var i = 0; i < $scope.profiles.length; i++) {
                if ($scope.profiles[i].active) {
                    $scope.editProfile($scope.profiles[i]);
                    break;
                }
            }
            if ($scope.currentProfile === null && $scope.profiles.length > 0) {
                $scope.editProfile($scope.profiles[0]);
            }
        };
        $scope.init();
        $scope.$on('$routeChangeStart', function (next, current) {
            $scope.clean();
        });

        //sichert den Block des gerade per drag-and-drop bewegten Wochentags,
        // um ggf. beim Erstellen eines neuen Blocks das Label und die Intervalle
        // kopieren zu koennen

        $scope.saveBlock = function (event, ui, blockid) {
            $scope.movedBlockIndex = $scope.getBlockIndex($scope.currentProfile.facilityProfiles[0].blocks, blockid);
        }


        // Block zerlegen: Tag wurde auf Trennsymbol gezogen
        $scope.$watch('newBlockArray.length', function () {
            $scope.seperateBlocks($scope.newBlockArray);
        });

        $scope.seperateBlocks = function (srcBlockArray) {
            if (srcBlockArray.length > 0) {
                for (var obi = 0; obi < $scope.currentProfile.facilityProfiles[0].blocks.length; obi++) {
                    if ($scope.currentProfile.facilityProfiles[0].blocks[obi].days.length === 0) {
                        $scope.currentProfile.facilityProfiles[0].blocks[obi].days.push(srcBlockArray.pop());

                        $scope.currentProfile.facilityProfiles[0].blocks[obi].dayLabels = [];
                        $scope.currentProfile.facilityProfiles[0].blocks[obi].dayLabels.push($scope.getDayByInt($scope.currentProfile.facilityProfiles[0].blocks[obi].days[0]));

                        if ($scope.movedBlockIndex != null) {
                            // Wir wissen, aus welchem Tagesblock der Tag gezogen wurde,
                            // wir koennen fuer alle Raeume die Intervalle aus diesem Block in den
                            // neuen Block kopieren
                            for (var facnr = 0; facnr < $scope.currentProfile.facilityProfiles.length; facnr++) {
                                $scope.currentProfile.facilityProfiles[facnr].blocks[obi].intervals = angular.copy($scope.currentProfile.facilityProfiles[facnr].blocks[$scope.movedBlockIndex].intervals);
                                //console.log("copied " + $scope.currentProfile.facilityProfiles[facnr].blocks[obi].intervals.length + " intervals for facility " + facnr + " from Block " + $scope.movedBlockIndex + " to Block " + obi);
                            }
                        }
                        break;
                    }
                }

                if (srcBlockArray.length > 0) {
                    var highestID = 0;
                    for (var bli = 0; bli < $scope.currentProfile.facilityProfiles[0].blocks.length; bli++) {
                        if ($scope.currentProfile.facilityProfiles[0].blocks[bli].blockId > highestID) {
                            highestID = $scope.currentProfile.facilityProfiles[0].blocks[bli].blockId;
                        }
                    }

                    for (var fpi = 0; fpi < $scope.currentProfile.facilityProfiles.length; fpi++) {
                        $scope.currentProfile.facilityProfiles[fpi].blocks.push(
                                {
                                    "blockId": ++highestID,
                                    "days": srcBlockArray.slice(),
                                    "dayLabels": [],
                                    "intervals":
                                            [{
                                                    "tempIntervalId": 0,
                                                    "intervalFrom": 0,
                                                    "mode": 103,
                                                    "manualTemp": 21,
                                                    "newInterval": true,
                                                    "size": 0
                                                }]
                                }
                        );
                    }
                    srcBlockArray = [];
                }
            }
            $scope.movedBlockIndex = null;
        };

        $scope.showUnsavedInfo = function (change, after, next) {
            if ($scope.checkUnsavedChanges()) {
                smoke.quiz("Möchten Sie die offenen Änderungen speichern?", function (evt) {
                    if (evt === "Speichern") {
                        change();
                        after(next);
                    }
                    else if (evt === "Nicht speichern") {
                        for (var i = 0; i < $scope.profiles.length; i++) {
                            if ($scope.profiles[i].profileId === $scope.currentProfile.profileId) {
                                $scope.profiles[i] = angular.copy($scope.currentProfileOld);
                            }
                        }
                        after(next);
                    }
                }, {
                    button_1: "Speichern",
                    button_2: "Nicht speichern",
                    button_cancel: "Abbrechen"
                });
            }
            else {
                after(next);
            }
        };
        $scope.showHelpVideo = function () {
            $scope.showHelp = !$scope.showHelp;
        };
        $scope.$on('$locationChangeStart', function (event, next, current) {         // Bevor Seite gewechselt wird
            if (!$scope.changeRoute) {
                event.preventDefault();
                $scope.showUnsavedInfo($scope.saveChange, $scope.changeCurrentRoute, next);
            }
        });
        $scope.changeCurrentRoute = function (next) {
            setTimeout(function () {
                $scope.changeRoute = true;
                window.location.href = next;
            }, 100);
        };
        $scope.checkUnsavedChanges = function () {
            return JSON.stringify(angular.copy($scope.currentProfile)) !== JSON.stringify($scope.currentProfileOld);
        };
        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
        $scope.getTemperatureByMode = function (mode) {
            if (mode === 103) {
                return $scope.calcTemp($scope.currentInterval.manualTemp);
            }
            else {
                for (var j = 0; j < $scope.temperatureFacilitySettings.length; j++) {
                    if ($scope.temperatureFacilitySettings[j].facId === $scope.currentFacility.facId) {
                        for (var i = 0; i < $scope.temperatureFacilitySettings[j].temperatureSettings.length; i++) {
                            if ($scope.temperatureFacilitySettings[j].temperatureSettings[i].temperatureMode === mode) {
                                return $scope.calcTemp($scope.temperatureFacilitySettings[j].temperatureSettings[i].temperature);
                            }
                        }
                    }
                }
            }
        };

        $scope.calcTemp = function (temp) {
            if (temp < 5) {
                return "OFF";
            }
            else if (temp > 30) {
                return "ON";
            }
            else {
                return $filter('number')(temp, 1) + "°";
            }
        };


        $scope.showNewProfileDiv = function () {
            $scope.newProgramDivVisible = !$scope.newProgramDivVisible;
        };

        $scope.shallShowProgramIntro = function () {
            if (localStorage.getItem('shallShowProgramIntro') === "true") {
                return false;
            } else {
                localStorage.setItem('shallShowProgramIntro', true);
                return true;
            }
        };

        $scope.checkLastProgramChange = function () {
            var currentDate = (new Date()).getTime();
            if (localStorage.getItem('lastProfileChange') !== null) {
                if (currentDate - localStorage.getItem('lastProfileChange') * 1 < 1000 * 60 * 60) {
                    var txt = "Bitte beachten Sie, dass die Funkübertragung aufgrund gesetzlicher Bestimmungen innerhalb von einer Stunde nur begrenzt möglich ist. Bei mehrmaligem Umschalten zwischen den Wochenprogrammen können ggf. Daten nicht übertragen werden.";
                    smoke.alert(txt, function (e) {
                    }, {
                        ok: "Ok"
                    });
                }
            }
            localStorage.setItem('lastProfileChange', currentDate);
        };

        $scope.HelpOptions = {
            steps: [
                {
                    element: '#profileOverview',
                    intro: "Hier sehen Sie eine Übersicht Ihrer Wochenprogramme.",
                    position: 'right'
                },
                {
                    element: '#activateProfile',
                    intro: "Klicken Sie auf einen Stern, um das Profil für Räume mit eingeschaltetem Wochenprogramm auszuwählen. Achtung: Nur Räume, bei denen Sie den „Haken“ bei „Wochenprogramme“ gesetzt haben übernehmen das hier ausgewählte Wochenprogramm.",
                    position: 'right'
                },
                {
                    element: '#blockOverview',
                    intro: "Die grauen Bereiche stellen Gruppen dar. Weitere Tage können mittels Drag&Drop jeweils in eine Gruppe abgelegt werden. Dabei nimmt der neu abgelegte Tag die Einstellungen der Gruppe an. Zum Heraustrennen wird der gewünschte Tag auf die Schere gezogen.",
                    position: 'top'
                },
                {
                    element: '#roomSetting',
                    intro: "Pro Raum können Sie bis zu 13 Intervalle mit unterschiedlichen Temperaturen bzw. Modi einstellen. Dazu klicken Sie einfach auf einen gewünschten Block.",
                    position: 'top'
                },
                {
                    element: '#timeSlider',
                    intro: "Um die Zeit der Intervalle zu verändern, schieben Sie den schwarzen Balken zur gewünschten Uhrzeit.",
                    position: 'left'
                }
            ],
            showStepNumbers: false,
            exitOnEsc: true,
            nextLabel: '<strong>Weiter</strong>',
            prevLabel: 'Zurück',
            skipLabel: 'Schließen',
            doneLabel: 'Schließen'
        };

        // verschiebt die Schaltzeitpunkte des aktuellen Wochenprogramms
        // bei Steckdosenraeumen nach dem Zufallsprinzip, um anwesende
        // Bewohner zu simulieren

        $scope.shuffleSwitchpoints = function () {
            function shuffleSwitchpointsConfirmed() {
                //console.log("shuffleSwitchpointsConfirmed()");
                $scope.clean();
                // Wochenprofil des aktuellen Raums tageweise zerlegen
                // 

                for (var blocknr = 0; blocknr < $scope.currentProfile.facilityProfiles[0].blocks.length; blocknr++) {
                    // alle Bloecke mit mehr als einem Tag
                    var blockdays = $scope.currentProfile.facilityProfiles[0].blocks[blocknr].days.length;
                    if (blockdays > 1) {
                        // Ueberzaehlige Tage in leeren Block verschieben
                        for (var daynr = 1; daynr < blockdays; daynr++) {
                            var blocks = [];
                            blocks.push($scope.currentProfile.facilityProfiles[0].blocks[blocknr].days.pop());
                            // die Logik gibt es schon fuer das Zerlegen per drag-and-drop
                            $scope.movedBlockIndex = blocknr;
                            $scope.seperateBlocks(blocks);
                        }
                    }

                }

                // alle Bloecke der aktuellen Facility
                var facilityIx = $scope.getFacilityIndex($scope.currentProfile.facilityProfiles, $scope.currentFacility.facId);
                //console.log("vorher:"); logIntervals(facilityIx);
                for (var blockIx = 0; blockIx < $scope.currentFacility.blocks.length; blockIx++) {
                    randomizeBlockIntervals(facilityIx, blockIx, maxrandom)
                }
                //console.log("nachher:"); logIntervals(facilityIx);
                $scope.safeApply;
                $scope.$parent.$apply();
            }

            function randomizeBlockIntervals(facilityIx, blockIx, maxrandom) {


                for (var i = 1; i < $scope.currentFacility.blocks[blockIx].intervals.length; i++) {
                    var ug = 0;
                    var og = 95;
                    // intervals[0] hat immer Wert 0 und kann nicht veraendert werden
                    var aktVal = $scope.currentFacility.blocks[blockIx].intervals[i].intervalFrom;
                    // untere Grenze des Variationsbereichs wird bestimmt durch
                    if (i > 0) {
                        // a) Wertebereich 0-95 (Intilialwert)
                        // b) den linken Nachbarn
                        ug = $scope.currentFacility.blocks[blockIx].intervals[i - 1].intervalFrom + 1;
                    }
                    // c) die maximale Variation
                    ug = max(ug, aktVal - maxrandom);

                    // obere Grenze des Variationsbereichs wird bestimmt durch
                    if (i < $scope.currentFacility.blocks[blockIx].intervals.length - 1) {
                        // a) Wertebereich 0-95 (Intilialwert)
                        // b) den rechten Nachbarn
                        og = $scope.currentFacility.blocks[blockIx].intervals[i + 1].intervalFrom - 1;
                    }
                    // c) die maximale Variation
                    og = min(og, aktVal + maxrandom);

                    // daraus ergibt sich der Bereich
                    var range = og - ug + 1;
                    if (range > 1) {
                        var newVal = ug + Math.floor(Math.random() * range);
                    }
                    $scope.currentFacility.blocks[blockIx].intervals[i].intervalFrom = newVal;
                    $scope.currentProfile.facilityProfiles[facilityIx].blocks[blockIx].intervals[i].intervalFrom = newVal;
                    //console.log("Moved interval " + i + " facility " + $scope.currentFacility.facId + " Block " + blockIx + " randomly from " + aktVal + " to " + newVal);

                }


                // für int performanter als Math.min/max
                function min(a, b) {
                    return a < b ? a : b;
                }

                function max(a, b) {
                    return a > b ? a : b;
                }
            }
            function logIntervals(facilityIx) {

                console.log("Intervals for facility " + $scope.currentProfile.facilityProfiles[facilityIx].facId +
                        " Label:" + $scope.currentProfile.facilityProfiles[facilityIx].label);
                for (var bl = 0; bl < $scope.currentProfile.facilityProfiles[facilityIx].blocks.length; bl++) {
                    for (var iv = 0; iv < $scope.currentProfile.facilityProfiles[facilityIx].blocks[bl].intervals.length; iv++) {
                        console.log(" block " + bl + " interval " + iv + "   value:" + $scope.currentProfile.facilityProfiles[facilityIx].blocks[bl].intervals[iv].intervalFrom);
                    }

                }
            }

            if ($scope.isPlug($scope.currentInterval)) { // geht nur bei Steckdosenraeumen
                var maxrandom = 4; //4*15=60 Minuten
                $scope.clean();
                smoke.confirm("Diese Funktion trennt die Verbindung der Wochentage auf, damit die Schaltzeitpunkte für jeden Wochentag variiert werden kann. Es ist empfehlenswert, diese Funktion nur auf ein zuvor kopiertes Wochenprofil anzuwenden.",
                        function (e) {
                            if (e) {
                                shuffleSwitchpointsConfirmed();
                            }
                        }, {
                    ok: "Fortfahren",
                    cancel: "Abbrechen",
                    classname: "custom-class",
                    reverseButtons: true
                });




            }



        };



    }]);