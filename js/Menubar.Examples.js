Menubar.Examples = function(editor) {


	var option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent('View Journal');
	option.onClick( function () {

		window.open( 'https://link.springer.com/chapter/10.1007/978-3-030-82529-4_21', '_blank' );

	} );
	options.add( option );

	return container;

};
