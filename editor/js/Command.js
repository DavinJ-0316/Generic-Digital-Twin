var Command = function(editorRef) {

    this.id = -1;
    this.inMemory = false;
    this.updatable = false;
    this.type = '';
    this.name = '';

    if (editorRef !== undefined) {

        Command.editor = editorRef;

    }
    this.editor = Command.editor;


};

Command.prototype.toJSON = function() {

    var output = {};
    output.type = this.type;
    output.id = this.id;
    output.name = this.name;
    return output;

};

Command.prototype.fromJSON = function(json) {

    this.inMemory = true;
    this.type = json.type;
    this.id = json.id;
    this.name = json.name;

};