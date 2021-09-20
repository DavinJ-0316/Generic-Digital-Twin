Menubar.Play = function(editor, viewport) {

    var signals = editor.signals;

    var container = new UI.Panel();
    container.setClass('menu');

    var isPlaying = false;

    var title = new UI.Panel();
    title.setClass('title');
    title.setTextContent('Play');
    title.onClick(function() {

        if (isPlaying === false) {

            isPlaying = true;
            title.setTextContent('Stop');
            //signals.startPlayer.dispatch();
            viewport.hidGrid();
            viewport.render();

        } else {

            isPlaying = false;
            title.setTextContent('Play');
            //signals.stopPlayer.dispatch();
            viewport.showGrid();
            viewport.render();

        }

    });
    container.add(title);

    return container;

};
