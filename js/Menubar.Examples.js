Menubar.Examples = function(editor) {

         
                   var container = new UI.Panel();
                   container.setClass('menu');
      
                   var title = new UI.Panel();
                   title.setClass('title');
                   title.setTextContent('Article');
                   title.onClick(function() {

                        window.open("https://link.springer.com/chapter/10.1007/978-3-030-82529-4_21", "_blank")

                   });
                   container.add(title);
     
         
         return container;
   

};
