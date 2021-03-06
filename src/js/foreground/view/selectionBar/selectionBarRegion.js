﻿define(function (require) {
    'use strict';

    var SelectionBar = require('foreground/model/selectionBar');
    var SelectionBarView = require('foreground/view/selectionBar/selectionBarView');

    var SelectionBarRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.foregroundArea.vent, 'rendered', this._onForegroundAreaRendered);
        },
        
        _onForegroundAreaRendered: function () {
            var selectionBar = new SelectionBar();
            this.show(new SelectionBarView({
                model: selectionBar
            }));

            this.listenTo(selectionBar, 'change:activeCollection', this._onSelectionBarChangeActiveCollection);
        },
        
        _onSelectionBarChangeActiveCollection: function (model, activeCollection) {
            this.$el.toggleClass('is-visible', activeCollection !== null);
        }
    });

    return SelectionBarRegion;
});