var SetMaterialColorCommand = function(object, attributeName, newValue, materialSlot) {

    Command.call(this);

    this.type = 'SetMaterialColorCommand';
    this.name = 'Set Material.' + attributeName;
    this.updatable = true;

    this.object = object;
    this.material = this.editor.getObjectMaterial(object, materialSlot);

    this.oldValue = (this.material !== undefined) ? this.material[attributeName].getHex() : undefined;
    this.newValue = newValue;

    this.attributeName = attributeName;

};

SetMaterialColorCommand.prototype = {

    execute: function() {

        this.material[this.attributeName].setHex(this.newValue);

        this.editor.signals.materialChanged.dispatch(this.material);

    },

    undo: function() {

        this.material[this.attributeName].setHex(this.oldValue);

        this.editor.signals.materialChanged.dispatch(this.material);

    },

    update: function(cmd) {

        this.newValue = cmd.newValue;

    },

    toJSON: function() {

        var output = Command.prototype.toJSON.call(this);

        output.objectUuid = this.object.uuid;
        output.attributeName = this.attributeName;
        output.oldValue = this.oldValue;
        output.newValue = this.newValue;

        return output;

    },

    fromJSON: function(json) {

        Command.prototype.fromJSON.call(this, json);

        this.object = this.editor.objectByUuid(json.objectUuid);
        this.attributeName = json.attributeName;
        this.oldValue = json.oldValue;
        this.newValue = json.newValue;

    }

};