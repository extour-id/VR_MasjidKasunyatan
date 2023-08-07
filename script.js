(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_DD57D740_CD5B_C0F5_41D7_4860E8252FD0]); this.init(); this.syncPlaylists([this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_2336CAC7_33B6_1847_41C5_BCE9A6DF9597].forEach(function(component) { component.set('visible', false); }) }",
 "class": "Player",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "horizontalAlign": "left",
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "children": [
  "this.MainViewer",
  "this.Container_2336FAC7_33B6_1847_41C0_996782E1591E",
  "this.Container_234FD9A3_33AA_18FE_41B4_451D746CF08E",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "minHeight": 20,
 "scripts": {
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "unregisterKey": function(key){  delete window[key]; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "existsKey": function(key){  return key in window; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "paddingLeft": 0,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_2336CAC7_33B6_1847_41C5_BCE9A6DF9597",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "buttonToggleMute": "this.IconButton_C73DCEFB_CA18_3323_41A0_9DC35F84CF21",
 "downloadEnabled": false,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -89.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D88FCD28_CD29_40B5_41E7_1759DB0D530E",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": -91.09,
   "backwardYaw": 90.56,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA"
  },
  {
   "yaw": -44.47,
   "backwardYaw": -160.44,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_2787A947_3495_5AA5_41BB_37F6FF692539",
 "thumbnailUrl": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_t.jpg",
 "label": "Gerbang Masuk Masjid",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_20F799E3_349F_DD9C_41C9_2727C758AED5",
  "this.overlay_209C5C27_349F_3AE4_41C3_0DA7F5FBA9DB",
  "this.overlay_2778CF9A_349D_35AC_41BD_0C99545C09E4",
  "this.popup_2011B4D3_349D_CBBD_41C6_5403B777C465"
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -11.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D87B3E09_CD29_4074_41CE_77AEBC71E423",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_camera",
 "automaticRotationSpeed": 40
},
{
 "autoplay": true,
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_DD57D740_CD5B_C0F5_41D7_4860E8252FD0.ogg",
  "mp3Url": "media/audio_DD57D740_CD5B_C0F5_41D7_4860E8252FD0.mp3"
 },
 "class": "MediaAudio",
 "id": "audio_DD57D740_CD5B_C0F5_41D7_4860E8252FD0",
 "data": {
  "label": "Arabic Theme Music _ No Copyright _ Arabic Background Music_ Ramadan music no copyright"
 }
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 174.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D8A23D73_CD29_409B_41CC_A9E616251726",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_camera",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -20.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D89CBD5A_CD29_4095_41E5_25323CA3ADBF",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": 22.09,
   "backwardYaw": 159.04,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4"
  },
  {
   "yaw": -135.82,
   "backwardYaw": -5.78,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27B35653_3496_F6BD_41C3_861159647389"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C",
 "thumbnailUrl": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_t.jpg",
 "label": "Kolam",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_22143C41_34AF_7A9D_41C9_3FF3CE4CE21C",
  "this.overlay_2279CD47_34AF_3AA5_41AC_1D9A5ED2408E",
  "this.overlay_23871015_34AE_CAA4_41BA_EB9890F99CAD",
  "this.overlay_2396A2B5_34AE_CFE4_41B4_C829241930B6"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539_camera"
  },
  {
   "media": "this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_camera"
  },
  {
   "media": "this.panorama_27B35653_3496_F6BD_41C3_861159647389",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27B35653_3496_F6BD_41C3_861159647389_camera"
  },
  {
   "media": "this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_camera"
  },
  {
   "media": "this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570_camera"
  },
  {
   "media": "this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_camera"
  },
  {
   "media": "this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_camera"
  },
  {
   "media": "this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_camera"
  },
  {
   "media": "this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_camera"
  },
  {
   "media": "this.panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28",
   "camera": "this.panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 154.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DDFDDF30_CD29_4095_41B5_692D54CC1533",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": 5.91,
   "backwardYaw": -120.09,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570"
  },
  {
   "yaw": 156.45,
   "backwardYaw": -25.12,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27B35653_3496_F6BD_41C3_861159647389"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4",
 "thumbnailUrl": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_t.jpg",
 "label": "Jalan 2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2166E665_3493_7764_41C9_2BBC29D56129",
  "this.overlay_22D0E026_3492_CAE7_41B4_7641432ED7B6"
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 112.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D859ADE0_CD29_43B4_41DE_7FFAF8F833B3",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -157.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D82D6E45_CD29_40FC_41CD_DD2263C2EEAC",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": 22.42,
   "backwardYaw": 101.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5"
  },
  {
   "yaw": -160.44,
   "backwardYaw": -44.47,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544",
 "thumbnailUrl": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_t.jpg",
 "label": "Jalan 5",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_226FE02D_34B3_4AE5_41B7_25F66E77895D",
  "this.overlay_23A5B3B5_34B3_4DE4_41C9_E3F62060CB3B"
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_27AF8F90_3497_55BC_41AE_9184F5552570_camera",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_27B35653_3496_F6BD_41C3_861159647389_camera",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 44.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D8526DCB_CD29_43F4_41CA_0F59AA70EFE1",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 19.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D8977D42_CD29_40F5_41D3_D4F7759E002E",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_camera",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -4.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D81DEE31_CD29_4094_41E6_937416539B66",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -5.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DDF89F4D_CD29_408F_41E6_5FE9957D3832",
 "automaticRotationSpeed": 40
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_camera",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": 168.38,
   "backwardYaw": -88.62,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA"
  },
  {
   "yaw": -5.78,
   "backwardYaw": -135.82,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C"
  },
  {
   "yaw": 16.6,
   "backwardYaw": -67.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5"
  },
  {
   "yaw": -25.12,
   "backwardYaw": 156.45,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_27B35653_3496_F6BD_41C3_861159647389",
 "thumbnailUrl": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_t.jpg",
 "label": "Jalan 1",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_21C84C42_3495_7A9F_4190_DB9B2E215D82",
  "this.overlay_212FA643_3495_369D_414E_347DCE997F2B",
  "this.overlay_215D7ECC_3495_D7A4_4159_D30417BEB280",
  "this.overlay_21979089_3495_4BAD_41C3_AEDD62FC482E"
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_camera",
 "automaticRotationSpeed": 40
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxHeight": "95%",
 "showEasing": "cubic_in",
 "pitch": -5.86,
 "hfov": 10.02,
 "id": "popup_2011B4D3_349D_CBBD_41C6_5403B777C465",
 "showDuration": 0,
 "hideEasing": "cubic_out",
 "class": "PopupPanoramaOverlay",
 "hideDuration": 0,
 "image": {
  "levels": [
   {
    "url": "media/popup_2011B4D3_349D_CBBD_41C6_5403B777C465_0_2.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupDistance": 100,
 "rotationZ": 0,
 "yaw": 8.31,
 "popupMaxWidth": "95%"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -88.62,
   "backwardYaw": 168.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27B35653_3496_F6BD_41C3_861159647389"
  },
  {
   "yaw": 90.56,
   "backwardYaw": -91.09,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539"
  },
  {
   "yaw": 38.61,
   "backwardYaw": 175.09,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA",
 "thumbnailUrl": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_t.jpg",
 "label": "Teras Depan",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_203E717C_3493_4D64_41C9_CE47E339E238",
  "this.overlay_219C2CB5_3493_5BE4_41AE_CE15D6D18556",
  "this.overlay_2013F7E9_3493_356C_41C4_4F94C419578A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 174.48,
   "backwardYaw": 88.98,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28",
 "thumbnailUrl": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_t.jpg",
 "label": "Dalam Masjid",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2CBAB966_34B7_DD67_41C9_21121EF39DF6"
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 135.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D8BD2DA1_CD29_43B7_41E2_98F3B95C9F4F",
 "automaticRotationSpeed": 40
},
{
 "displayOriginPosition": {
  "hfov": 165,
  "yaw": 0,
  "stereographicFactor": 1,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90
 },
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2787A947_3495_5AA5_41BB_37F6FF692539_camera",
 "displayMovements": [
  {
   "duration": 1000,
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "targetPitch": 0,
   "targetStereographicFactor": 0,
   "targetHfov": 130,
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 4000,
   "easing": "cubic_in_out"
  }
 ],
 "automaticRotationSpeed": 40
},
{
 "id": "ImageResource_2EFF9B8A_34BD_FDAF_4173_B4F1FEF8CAE8",
 "levels": [
  {
   "url": "media/popup_2011B4D3_349D_CBBD_41C6_5403B777C465_0_0.jpg",
   "width": 4000,
   "height": 3000,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_2011B4D3_349D_CBBD_41C6_5403B777C465_0_1.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_2011B4D3_349D_CBBD_41C6_5403B777C465_0_2.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_2011B4D3_349D_CBBD_41C6_5403B777C465_0_3.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -163.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D9DC2E82_CD29_4074_41D5_283A56568BAF",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": 159.04,
   "backwardYaw": 22.09,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C"
  },
  {
   "yaw": -120.09,
   "backwardYaw": 5.91,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_27AF8F90_3497_55BC_41AE_9184F5552570",
 "thumbnailUrl": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_t.jpg",
 "label": "Jalan 3",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_214D48D9_34AD_3BAC_4184_7C22BB940597",
  "this.overlay_22A9895C_34AE_DAA4_41B5_E5969CAA8C0C"
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -174.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D83DEE59_CD29_4094_41E1_229DF1ADB2F6",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -23.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D8688DF4_CD29_439C_41E7_794A5A27728E",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -157.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D9CC0E6E_CD29_408C_41E3_806F209CB7AB",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 88.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D80B2E1D_CD29_408C_41E4_CA617CC5FC0E",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -141.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_DD87CF6B_CD29_408B_41E5_756D91FF73B0",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": 88.98,
   "backwardYaw": 174.48,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28"
  },
  {
   "yaw": 175.09,
   "backwardYaw": 38.61,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411",
 "thumbnailUrl": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_t.jpg",
 "label": "Ruang Tengah Masjid",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_2349A2CA_34B5_CFAF_41BC_3562EAAEA22F",
  "this.overlay_236010ED_34B5_4B64_41C7_702657755D6F"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539_camera"
  },
  {
   "media": "this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_camera"
  },
  {
   "media": "this.panorama_27B35653_3496_F6BD_41C3_861159647389",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27B35653_3496_F6BD_41C3_861159647389_camera"
  },
  {
   "media": "this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_camera"
  },
  {
   "media": "this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570_camera"
  },
  {
   "media": "this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_camera"
  },
  {
   "media": "this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_camera"
  },
  {
   "media": "this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_camera"
  },
  {
   "media": "this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_camera"
  },
  {
   "media": "this.panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_camera"
  }
 ],
 "id": "ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 59.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D9EE8E96_CD29_419C_41D1_4F213CD31E43",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_camera",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 91.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D841ADB5_CD29_439F_41E9_987B7337CE2A",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_camera",
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": 101.38,
   "backwardYaw": 22.42,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544"
  },
  {
   "yaw": -67.17,
   "backwardYaw": 16.6,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_27B35653_3496_F6BD_41C3_861159647389"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_27842E16_3497_F6A7_41C2_892F1866E1D5",
 "thumbnailUrl": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_t.jpg",
 "label": "Jalan 4",
 "pitch": 0,
 "partial": false,
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_23822E68_34B3_576B_4182_91B517382288",
  "this.overlay_23FEC55B_34B3_4AAD_41CA_0A7935A6CA7B"
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -78.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D8A98D8A_CD29_4075_41E7_649BF666B57C",
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1298,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -91.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 1043,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_D887FD0F_CD29_408B_41C6_59A65530827F",
 "automaticRotationSpeed": 40
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#333333"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "paddingLeft": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "class": "ViewerArea",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderColor": "#000000",
 "playbackBarHeadHeight": 15
},
{
 "class": "Container",
 "scrollBarWidth": 10,
 "id": "Container_2336FAC7_33B6_1847_41C0_996782E1591E",
 "width": 115.05,
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Container_23374AC7_33B6_1847_419D_531B050E177A",
  "this.Container_23376AC7_33B6_1847_41B2_B5408D58E025"
 ],
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": 603,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "--SETTINGS"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarWidth": 10,
 "id": "Container_234FD9A3_33AA_18FE_41B4_451D746CF08E",
 "left": "0%",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Container_234F89A3_33AA_18FE_41A2_292F21B6573C"
 ],
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingLeft": 0,
 "top": "0%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_234FD9A3_33AA_18FE_41B4_451D746CF08E, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "PANORAMA LIST"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0
 ],
 "class": "UIComponent",
 "id": "veilPopupPanorama",
 "left": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "top": 0,
 "paddingRight": 0,
 "bottom": 0,
 "minWidth": 0,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "backgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.55,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "data": {
  "name": "UIComponent8250"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [],
 "class": "ZoomImage",
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "top": 0,
 "paddingRight": 0,
 "bottom": 0,
 "minWidth": 0,
 "backgroundColor": [],
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "scaleMode": "custom",
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "data": {
  "name": "ZoomImage8251"
 },
 "propagateClick": false
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "class": "CloseButton",
 "iconWidth": 20,
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "data": {
  "name": "CloseButton8252"
 },
 "horizontalAlign": "center",
 "fontFamily": "Arial",
 "right": 10,
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 20,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "paddingLeft": 5,
 "minHeight": 0,
 "paddingRight": 5,
 "iconColor": "#000000",
 "minWidth": 0,
 "iconLineWidth": 5,
 "mode": "push",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "top": 10,
 "fontSize": "1.29vmin",
 "label": "",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "gap": 5,
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "paddingTop": 5,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 5,
 "shadowBlurRadius": 6,
 "cursor": "hand",
 "fontWeight": "normal",
 "propagateClick": false
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "class": "IconButton",
 "id": "IconButton_2336CAC7_33B6_1847_41C5_BCE9A6DF9597",
 "horizontalAlign": "center",
 "width": 38,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2336CAC7_33B6_1847_41C5_BCE9A6DF9597.png",
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_2336CAC7_33B6_1847_41C5_BCE9A6DF9597_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "paddingLeft": 0,
 "height": 38,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2336CAC7_33B6_1847_41C5_BCE9A6DF9597_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "propagateClick": true
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "class": "IconButton",
 "id": "IconButton_C73DCEFB_CA18_3323_41A0_9DC35F84CF21",
 "horizontalAlign": "center",
 "width": 38,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_C73DCEFB_CA18_3323_41A0_9DC35F84CF21.png",
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_C73DCEFB_CA18_3323_41A0_9DC35F84CF21_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "paddingLeft": 0,
 "height": 38,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_C73DCEFB_CA18_3323_41A0_9DC35F84CF21_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton MUTE"
 },
 "propagateClick": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA, this.camera_D88FCD28_CD29_40B5_41E7_1759DB0D530E); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Teras masjid"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.74,
   "image": "this.AnimatedImageResource_2ECC8B6A_34BD_FD6C_41B9_8FAB0C764460",
   "yaw": -91.09,
   "pitch": -18.97,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_20F799E3_349F_DD9C_41C9_2727C758AED5",
 "maps": [
  {
   "hfov": 15.74,
   "yaw": -91.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544, this.camera_D8977D42_CD29_40F5_41D3_D4F7759E002E); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pintu masuk Makam"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.68,
   "image": "this.AnimatedImageResource_2ECC7B6A_34BD_FD6C_41B4_CFB9592E9FD2",
   "yaw": -44.47,
   "pitch": -3.4,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_209C5C27_349F_3AE4_41C3_0DA7F5FBA9DB",
 "maps": [
  {
   "hfov": 11.68,
   "yaw": -44.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_2011B4D3_349D_CBBD_41C6_5403B777C465, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconWidth':20,'pressedBorderSize':0,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'paddingRight':5,'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2EFF9B8A_34BD_FDAF_4173_B4F1FEF8CAE8, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Daftar Nama makam "
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.02,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_1_HS_2_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.86,
   "yaw": 8.31,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2778CF9A_349D_35AC_41BD_0C99545C09E4",
 "maps": [
  {
   "hfov": 10.02,
   "yaw": 8.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570, this.camera_D89CBD5A_CD29_4095_41E5_25323CA3ADBF); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Keluar Kolam"
  }
 ],
 "data": {
  "label": "Circle Point 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.73,
   "image": "this.AnimatedImageResource_2ECBDB7A_34BD_FD6C_41B1_5B3E5D355F4A",
   "yaw": 22.09,
   "pitch": 0,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_22143C41_34AF_7A9D_41C9_3FF3CE4CE21C",
 "maps": [
  {
   "hfov": 14.73,
   "yaw": 22.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Keluar Kolam"
  }
 ],
 "data": {
  "label": "Circle Point 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.68,
   "image": "this.AnimatedImageResource_2ECB0B7A_34BD_FD6C_418E_6CC3BCD36855",
   "yaw": 71.18,
   "pitch": -4.5,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2279CD47_34AF_3AA5_41AC_1D9A5ED2408E",
 "maps": [
  {
   "hfov": 14.68,
   "yaw": 71.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27B35653_3496_F6BD_41C3_861159647389, this.camera_D8A23D73_CD29_409B_41CC_A9E616251726); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Keluar Kolam"
  }
 ],
 "data": {
  "label": "Circle Point 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.69,
   "image": "this.AnimatedImageResource_2ECB4B7A_34BD_FD6C_41BE_5E0DAED84DA7",
   "yaw": -135.82,
   "pitch": 4.09,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23871015_34AE_CAA4_41BA_EB9890F99CAD",
 "maps": [
  {
   "hfov": 14.69,
   "yaw": -135.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Keluar Kolam"
  }
 ],
 "data": {
  "label": "Circle Point 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.71,
   "image": "this.AnimatedImageResource_2ECABB7A_34BD_FD6C_41C6_D0FE5AE97475",
   "yaw": -34.36,
   "pitch": -2.86,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2396A2B5_34AE_CFE4_41B4_C829241930B6",
 "maps": [
  {
   "hfov": 14.71,
   "yaw": -34.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27AF8F90_3497_55BC_41AE_9184F5552570, this.camera_D9EE8E96_CD29_419C_41D1_4F213CD31E43); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan sekitar kolam 3"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.43,
   "image": "this.AnimatedImageResource_2EC96B7A_34BD_FD6C_41C0_80C63ADE77AC",
   "yaw": 5.91,
   "pitch": -10.78,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2166E665_3493_7764_41C9_2BBC29D56129",
 "maps": [
  {
   "hfov": 16.43,
   "yaw": 5.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27B35653_3496_F6BD_41C3_861159647389, this.camera_DDFDDF30_CD29_4095_41B5_692D54CC1533); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan sekitar kolam 1"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.77,
   "image": "this.AnimatedImageResource_2EC8CB7A_34BD_FD6C_41AD_D5D6D6335292",
   "yaw": 156.45,
   "pitch": -27.96,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_22D0E026_3492_CAE7_41B4_7641432ED7B6",
 "maps": [
  {
   "hfov": 14.77,
   "yaw": 156.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_1_HS_1_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5, this.camera_D8A98D8A_CD29_4075_41E7_649BF666B57C); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Menuju Makam"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.35,
   "image": "this.AnimatedImageResource_2EF58B7A_34BD_FD6C_41C1_42DF57FB341E",
   "yaw": 22.42,
   "pitch": -19.6,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_226FE02D_34B3_4AE5_41B7_25F66E77895D",
 "maps": [
  {
   "hfov": 18.35,
   "yaw": 22.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539, this.camera_D8BD2DA1_CD29_43B7_41E2_98F3B95C9F4F); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Gerbang Masuk masjid"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.97,
   "image": "this.AnimatedImageResource_2EF5EB7A_34BD_FD6C_41B9_9B053D1E11BF",
   "yaw": -160.44,
   "pitch": -29.42,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23A5B3B5_34B3_4DE4_41C9_E3F62060CB3B",
 "maps": [
  {
   "hfov": 16.97,
   "yaw": -160.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_1_HS_1_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.42,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27842E16_3497_F6A7_41C2_892F1866E1D5, this.camera_D859ADE0_CD29_43B4_41DE_7FFAF8F833B3); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "jalan menuju makam"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.74,
   "image": "this.AnimatedImageResource_2ECE2B7A_34BD_FD6C_4180_E24914649631",
   "yaw": 16.6,
   "pitch": -13.83,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_21C84C42_3495_7A9F_4190_DB9B2E215D82",
 "maps": [
  {
   "hfov": 18.74,
   "yaw": 16.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4, this.camera_D8688DF4_CD29_439C_41E7_794A5A27728E); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "jalan sekitar kolam 2"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.8,
   "image": "this.AnimatedImageResource_2EC9BB7A_34BD_FD6C_41C0_8CAE58B47C39",
   "yaw": -25.12,
   "pitch": -13.01,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_212FA643_3495_369D_414E_347DCE997F2B",
 "maps": [
  {
   "hfov": 18.8,
   "yaw": -25.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_1_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA, this.camera_D841ADB5_CD29_439F_41E9_987B7337CE2A); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Teras depan masjid"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.71,
   "image": "this.AnimatedImageResource_2EC9CB7A_34BD_FD6C_41C8_966ABD0A0C2B",
   "yaw": 168.38,
   "pitch": -14.24,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_215D7ECC_3495_D7A4_4159_D30417BEB280",
 "maps": [
  {
   "hfov": 18.71,
   "yaw": 168.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_2_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C, this.camera_D8526DCB_CD29_43F4_41CA_0F59AA70EFE1); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "masuk pintu kolam"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.25,
   "image": "this.AnimatedImageResource_2EC93B7A_34BD_FD6C_41B4_E17337962561",
   "yaw": -5.78,
   "pitch": -7.31,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_21979089_3495_4BAD_41C3_AEDD62FC482E",
 "maps": [
  {
   "hfov": 11.25,
   "yaw": -5.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2787A947_3495_5AA5_41BB_37F6FF692539, this.camera_D80B2E1D_CD29_408C_41E4_CA617CC5FC0E); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Gerbang masuk masjid"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.98,
   "image": "this.AnimatedImageResource_2ECF2B7A_34BD_FD6C_41AC_C22A2ED0981E",
   "yaw": 90.56,
   "pitch": -19.93,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_203E717C_3493_4D64_41C9_CE47E339E238",
 "maps": [
  {
   "hfov": 17.98,
   "yaw": 90.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27B35653_3496_F6BD_41C3_861159647389, this.camera_D87B3E09_CD29_4074_41CE_77AEBC71E423); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan sekitar masjid"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.35,
   "image": "this.AnimatedImageResource_2ECE8B7A_34BD_FD6C_41B8_6A9DF4568A8B",
   "yaw": -88.62,
   "pitch": -24.84,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_219C2CB5_3493_5BE4_41AE_CE15D6D18556",
 "maps": [
  {
   "hfov": 17.35,
   "yaw": -88.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_1_HS_1_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411, this.camera_D81DEE31_CD29_4094_41E6_937416539B66); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "masuk dalam masjid"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.36,
   "image": "this.AnimatedImageResource_2ECEEB7A_34BD_FD6C_419F_B9D1D7E3FA83",
   "yaw": 38.61,
   "pitch": -3.83,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2013F7E9_3493_356C_41C4_4F94C419578A",
 "maps": [
  {
   "hfov": 13.36,
   "yaw": 38.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411, this.camera_D887FD0F_CD29_408B_41C6_59A65530827F); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar dalam masjid"
  }
 ],
 "data": {
  "label": "Circle Point 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.97,
   "image": "this.AnimatedImageResource_2EF4FB7A_34BD_FD6C_4182_E62B9465003B",
   "yaw": 174.48,
   "pitch": -6.75,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2CBAB966_34B7_DD67_41C9_21121EF39DF6",
 "maps": [
  {
   "hfov": 10.97,
   "yaw": 174.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4, this.camera_D83DEE59_CD29_4094_41E1_229DF1ADB2F6); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan sekitar Kolam 2"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.78,
   "image": "this.AnimatedImageResource_2EC80B7A_34BD_FD6C_41B9_349BD4BF8EA6",
   "yaw": -120.09,
   "pitch": -19.37,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_214D48D9_34AD_3BAC_4184_7C22BB940597",
 "maps": [
  {
   "hfov": 15.78,
   "yaw": -120.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C, this.camera_D82D6E45_CD29_40FC_41CD_DD2263C2EEAC); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Masuk Kolam"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.09,
   "image": "this.AnimatedImageResource_2EC87B7A_34BD_FD6C_41A9_CA4D9692EEED",
   "yaw": 159.04,
   "pitch": -10.13,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_22A9895C_34AE_DAA4_41B5_E5969CAA8C0C",
 "maps": [
  {
   "hfov": 11.09,
   "yaw": 159.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28, this.camera_DDF89F4D_CD29_408F_41E6_5FE9957D3832); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Masuk dalam masjid"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.68,
   "image": "this.AnimatedImageResource_2EF55B7A_34BD_FD6C_41CA_2DDF0210B414",
   "yaw": 88.98,
   "pitch": -1.84,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2349A2CA_34B5_CFAF_41BC_3562EAAEA22F",
 "maps": [
  {
   "hfov": 12.68,
   "yaw": 88.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA, this.camera_DD87CF6B_CD29_408B_41E5_756D91FF73B0); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar masjid"
  }
 ],
 "data": {
  "label": "Circle Point 01"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.52,
   "image": "this.AnimatedImageResource_2EF48B7A_34BD_FD6C_41A4_D95D2DFD0DF4",
   "yaw": 175.09,
   "pitch": -4.91,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_236010ED_34B5_4B64_41C7_702657755D6F",
 "maps": [
  {
   "hfov": 6.52,
   "yaw": 175.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27B35653_3496_F6BD_41C3_861159647389, this.camera_D9DC2E82_CD29_4074_41D5_283A56568BAF); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Sekitar Masjid"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.01,
   "image": "this.AnimatedImageResource_2ECA1B7A_34BD_FD6C_41BA_6E563BC7A2DC",
   "yaw": -67.17,
   "pitch": -22.47,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23822E68_34B3_576B_4182_91B517382288",
 "maps": [
  {
   "hfov": 18.01,
   "yaw": -67.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544, this.camera_D9CC0E6E_CD29_408C_41E3_806F209CB7AB); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Menuju Makam"
  }
 ],
 "data": {
  "label": "Circle Arrow 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.74,
   "image": "this.AnimatedImageResource_2ECA4B7A_34BD_FD6C_41AB_86459E74FA01",
   "yaw": 101.38,
   "pitch": -15.92,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23FEC55B_34B3_4AAD_41CA_0A7935A6CA7B",
 "maps": [
  {
   "hfov": 18.74,
   "yaw": 101.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_1_HS_1_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "class": "Container",
 "scrollBarWidth": 10,
 "id": "Container_23374AC7_33B6_1847_419D_531B050E177A",
 "width": 110,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "right": "0%",
 "children": [
  "this.IconButton_23375AC7_33B6_1847_41A2_DE89BEF8BC0F"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "paddingLeft": 0,
 "height": 110,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "data": {
  "name": "button menu sup"
 },
 "propagateClick": true
},
{
 "class": "Container",
 "scrollBarWidth": 10,
 "id": "Container_23376AC7_33B6_1847_41B2_B5408D58E025",
 "scrollBarColor": "#000000",
 "data": {
  "name": "-button set"
 },
 "horizontalAlign": "center",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_2336DAC7_33B6_1847_41AD_EA66C9E3B674",
  "this.IconButton_2336CAC7_33B6_1847_41C5_BCE9A6DF9597",
  "this.IconButton_C73DCEFB_CA18_3323_41A0_9DC35F84CF21"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "width": "91.304%",
 "paddingRight": 4,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "85.96%",
 "top": "14.04%",
 "gap": 8,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "visible": false,
 "paddingBottom": 2,
 "borderRadius": 0,
 "overflow": "scroll",
 "propagateClick": true
},
{
 "class": "Container",
 "scrollBarWidth": 10,
 "id": "Container_234F89A3_33AA_18FE_41A2_292F21B6573C",
 "left": "15%",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.ViewerAreaLabeled_234F99A3_33AA_18FE_418B_E4AE62DBE584",
  "this.Container_22975C8D_33AA_F8CB_41C6_B01508B6BD83",
  "this.Container_234FA9A3_33AA_18FE_41B4_BA9331DE9A75"
 ],
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "top": "10%",
 "paddingRight": 0,
 "bottom": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_1_HS_0_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECC8B6A_34BD_FD6C_41B9_8FAB0C764460",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2787A947_3495_5AA5_41BB_37F6FF692539_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECC7B6A_34BD_FD6C_41B4_CFB9592E9FD2",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_0_0.png",
   "width": 1200,
   "height": 1800,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECBDB7A_34BD_FD6C_41B1_5B3E5D355F4A",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_1_0.png",
   "width": 1200,
   "height": 1800,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECB0B7A_34BD_FD6C_418E_6CC3BCD36855",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_2_0.png",
   "width": 1200,
   "height": 1800,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECB4B7A_34BD_FD6C_41BE_5E0DAED84DA7",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2786F4CA_3496_CBAF_41B7_07C5E1B7DB6C_1_HS_3_0.png",
   "width": 1200,
   "height": 1800,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECABB7A_34BD_FD6C_41C6_D0FE5AE97475",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_1_HS_0_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EC96B7A_34BD_FD6C_41C0_80C63ADE77AC",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2787B2C3_3497_4F9D_41B3_6624E2D234C4_1_HS_1_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EC8CB7A_34BD_FD6C_41AD_D5D6D6335292",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_1_HS_0_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EF58B7A_34BD_FD6C_41C1_42DF57FB341E",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27BEC2CC_3497_4FAB_41BB_03EF45F13544_1_HS_1_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EF5EB7A_34BD_FD6C_41B9_9B053D1E11BF",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_0_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECE2B7A_34BD_FD6C_4180_E24914649631",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_1_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EC9BB7A_34BD_FD6C_41C0_8CAE58B47C39",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_2_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EC9CB7A_34BD_FD6C_41C8_966ABD0A0C2B",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27B35653_3496_F6BD_41C3_861159647389_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EC93B7A_34BD_FD6C_41B4_E17337962561",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_1_HS_0_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECF2B7A_34BD_FD6C_41AC_C22A2ED0981E",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_1_HS_1_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECE8B7A_34BD_FD6C_41B8_6A9DF4568A8B",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_2785601B_3495_4AAD_41C8_76A5394B3CFA_1_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECEEB7A_34BD_FD6C_419F_B9D1D7E3FA83",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_203E4F4A_3495_D6AF_41C5_7EAAD7838A28_1_HS_0_0.png",
   "width": 1200,
   "height": 1800,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EF4FB7A_34BD_FD6C_4182_E62B9465003B",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_1_HS_0_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EC80B7A_34BD_FD6C_41B9_349BD4BF8EA6",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27AF8F90_3497_55BC_41AE_9184F5552570_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EC87B7A_34BD_FD6C_41A9_CA4D9692EEED",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EF55B7A_34BD_FD6C_41CA_2DDF0210B414",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27BFC253_3496_CEBD_41B9_DB09A71B5411_1_HS_1_0.png",
   "width": 1200,
   "height": 1800,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2EF48B7A_34BD_FD6C_41A4_D95D2DFD0DF4",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_1_HS_0_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECA1B7A_34BD_FD6C_41BA_6E563BC7A2DC",
 "frameDuration": 41
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_27842E16_3497_F6A7_41C2_892F1866E1D5_1_HS_1_0.png",
   "width": 1220,
   "height": 840,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_2ECA4B7A_34BD_FD6C_41AB_86459E74FA01",
 "frameDuration": 41
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "class": "IconButton",
 "id": "IconButton_23375AC7_33B6_1847_41A2_DE89BEF8BC0F",
 "horizontalAlign": "center",
 "width": 40,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_23375AC7_33B6_1847_41A2_DE89BEF8BC0F.png",
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_23375AC7_33B6_1847_41A2_DE89BEF8BC0F_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "paddingLeft": 0,
 "click": "if(!this.Container_23376AC7_33B6_1847_41B2_B5408D58E025.get('visible')){ this.setComponentVisibility(this.Container_23376AC7_33B6_1847_41B2_B5408D58E025, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_23376AC7_33B6_1847_41B2_B5408D58E025, false, 0, null, null, false) }",
 "height": 40,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23375AC7_33B6_1847_41A2_DE89BEF8BC0F_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "image button menu"
 },
 "propagateClick": true
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "class": "IconButton",
 "id": "IconButton_2336DAC7_33B6_1847_41AD_EA66C9E3B674",
 "horizontalAlign": "center",
 "width": 38,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2336DAC7_33B6_1847_41AD_EA66C9E3B674.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "paddingLeft": 0,
 "click": "if(!this.Container_234FD9A3_33AA_18FE_41B4_451D746CF08E.get('visible')){ this.setComponentVisibility(this.Container_234FD9A3_33AA_18FE_41B4_451D746CF08E, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_234FD9A3_33AA_18FE_41B4_451D746CF08E, false, 0, null, null, false) }",
 "height": 38,
 "rollOverIconURL": "skin/IconButton_2336DAC7_33B6_1847_41AD_EA66C9E3B674_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton Thumbline"
 },
 "propagateClick": true
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_234F99A3_33AA_18FE_418B_E4AE62DBE584",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "data": {
  "name": "Floor Plan"
 },
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "paddingLeft": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "class": "ViewerArea",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_22975C8D_33AA_F8CB_41C6_B01508B6BD83",
 "left": "0%",
 "shadowColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "layout": "vertical",
 "shadowVerticalLength": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Container_22974C8D_33AA_F8CB_41AD_A3183A986DA3",
  "this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7"
 ],
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "top": "0%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadowHorizontalLength": 0,
 "shadow": true,
 "backgroundOpacity": 0.35,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "class": "Container",
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "class": "Container",
 "children": [
  "this.IconButton_234FB9A3_33AA_18FE_41BC_FC6AF27F414E"
 ],
 "id": "Container_234FA9A3_33AA_18FE_41B4_BA9331DE9A75",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "paddingLeft": 0,
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": 140,
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "data": {
  "name": "header"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "scrollBarWidth": 10,
 "id": "Container_22974C8D_33AA_F8CB_41AD_A3183A986DA3",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.HTMLText_22973C8D_33AA_F8CB_41C5_829CCDAA6D35"
 ],
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 80,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 10,
 "backgroundColor": [
  "#333333"
 ],
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "data": {
  "name": "header"
 },
 "propagateClick": false
},
{
 "scrollBarWidth": 10,
 "id": "ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#FFFFFF",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#FFFFFF",
 "rollOverItemLabelFontSize": 16,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "width": "100%",
 "minHeight": 1,
 "itemBorderRadius": 0,
 "paddingRight": 70,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "verticalAlign": "middle",
 "itemLabelFontFamily": "Poppins",
 "minWidth": 1,
 "itemPaddingLeft": 3,
 "itemPaddingRight": 3,
 "selectedItemLabelFontColor": "#FFFFFF",
 "itemLabelPosition": "bottom",
 "height": "100%",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemHorizontalAlign": "center",
 "selectedItemThumbnailShadowColor": "#FFFFFF",
 "itemMaxWidth": 1000,
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "borderSize": 0,
 "selectedItemLabelFontSize": 16,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#999999",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailGrid_22971C8D_33AA_F8CB_41BE_C99F548146B7_playlist",
 "paddingLeft": 70,
 "scrollBarMargin": 2,
 "itemLabelFontSize": "12px",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemVerticalAlign": "top",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemLabelFontColor": "#FFFFFF",
 "itemHeight": 160,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 30,
 "itemThumbnailShadow": false,
 "itemLabelGap": 7,
 "itemPaddingBottom": 3,
 "paddingBottom": 70,
 "borderRadius": 5,
 "class": "ThumbnailGrid",
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemThumbnailWidth": 220
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "class": "IconButton",
 "id": "IconButton_234FB9A3_33AA_18FE_41BC_FC6AF27F414E",
 "horizontalAlign": "right",
 "right": 20,
 "width": 40,
 "borderSize": 0,
 "verticalAlign": "top",
 "minHeight": 40,
 "iconURL": "skin/IconButton_234FB9A3_33AA_18FE_41BC_FC6AF27F414E.png",
 "paddingRight": 0,
 "minWidth": 40,
 "mode": "push",
 "paddingLeft": 0,
 "click": "this.setComponentVisibility(this.Container_234FD9A3_33AA_18FE_41B4_451D746CF08E, false, 0, null, null, false)",
 "height": 41,
 "top": 20,
 "rollOverIconURL": "skin/IconButton_234FB9A3_33AA_18FE_41BC_FC6AF27F414E_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "IconButton X"
 },
 "propagateClick": false
},
{
 "class": "HTMLText",
 "scrollBarWidth": 10,
 "id": "HTMLText_22973C8D_33AA_F8CB_41C5_829CCDAA6D35",
 "left": "0%",
 "scrollBarColor": "#000000",
 "right": "22.88%",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 35,
 "minHeight": 0,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": 80,
 "top": "0%",
 "paddingTop": 17,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:2.99vh;font-family:'Poppins';\"><B>PANORAMA LIST</B></SPAN></SPAN></DIV></div>",
 "paddingBottom": 0,
 "data": {
  "name": "HTMLText54192"
 },
 "propagateClick": false
}],
 "width": "100%",
 "data": {
  "name": "Player435"
 },
 "propagateClick": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
