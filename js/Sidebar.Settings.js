Sidebar.Settings = function(editor) {

    var config = editor.config;
    var signals = editor.signals;

    var container = new UI.Panel();
    container.setBorderTop('0');
    container.setPaddingTop('20px');
    container.setPaddingBottom('20px');

    // class

    var options = {
        'css/light.css': 'light',
    };

    var themeRow = new UI.Row();
    var theme = new UI.Select().setWidth('150px');
    theme.setOptions(options);

    if (config.getKey('theme') !== undefined) {

        theme.setValue(config.getKey('theme'));

    }

    theme.onChange(function() {

        var value = this.getValue();

        editor.setTheme(value);
        editor.config.setKey('theme', value);

    });

    themeRow.add(new UI.Text('Theme').setWidth('90px'));
    themeRow.add(theme);

    container.add(themeRow);

    container.add(new Sidebar.Settings.Shortcuts(editor));
    container.add(new Sidebar.Settings.Viewport(editor));

    return container;

};