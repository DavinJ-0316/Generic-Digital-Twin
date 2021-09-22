Menubar.Examples = function(editor) {

         
                   var container = new UI.Panel();
                   container.setClass('menu');
      
                   var title = new UI.Panel();
                   title.setClass('title');
                   title.setTextContent('Article');
                   container.add(title);
      
                   var options = new UI.Panel();
                   options.setClass('options');
                   container.add(options);
      
      
                   var option = new UI.Row();
                   option.setClass('option');
                   option.setTextContent('View');
      
                   option.onClick(function() {
                    
                        window.open("https://link.springer.com/chapter/10.1007/978-3-030-82529-4_21", "_blank")
                           
                   });
                   options.add(option);
         
         return container;
   

};
