Menubar.Help = function(editor) {

   

 

    // options.add(new UI.HorizontalRule());




    
    // d3.json('https://api.jsonbin.io/b/6077e3125b165e19f620818e/4')
    // .then(data=>{
    //     console.log(data);


    //     let keys = Object.keys(data);
    //     console.log(keys);

    //     let values = Object.values(data);
    //     console.log(values);

    //     for(let i =0; i < keys.length; i++) {
    //         let key = [];
    //         key.push(`${keys[i]}`);
    //         console.log(key);
    
    //         let value = [];
    //         value.push(`${values[i]}`);
    //         console.log(value);
    
    
    //         let sels = d3.select("#charts").selectAll('iframe')
    //             .data(key);
    
    //         console.log(sels);
    
    //         sels.enter()
    //             .append('iframe')
    //             .attr('width','500px')
    //             .attr('height','270px')
    //             // .attr('src', d=>data[d]);
    //             .attr('src',value)
    //     }
       
           
    // })


    d3.json('https://api.jsonbin.io/b/61481dca9548541c29b53572')
    .then(data=>{
        // console.log(data);

        let keys = Object.keys(data);
        // console.log(keys);

        let values = Object.values(data);
        // console.log(values);

 
        for (let i=0; i<keys.length; i++) {
            options.add(new UI.HorizontalRule());
            var option = new UI.Row();
            option.setClass('option');
            option.setTextContent(`show ${keys[i]}`);
            // option.setTextContent("Show Graph");
            option.onClick(function() {
             
                    let key = [];
                    key.push(`${keys[i]}`);
                    console.log(key);
            
                    let value = [];
                    value.push(`${values[i]}`);
                    console.log(value);
            
                    d3.select("#charts").html('');
                    let sels = d3.select("#charts").selectAll('iframe')
                        .data(key);
            
                    console.log(sels);
            
                    sels.enter()
                        .append('iframe')
                        .attr('width','500px')
                        .attr('height','270px')
                        // .attr('src', d=>data[d]);
                        .attr('src',value)
            
                    
            


                d3.select('#charts')
                    .style('display','block');

                    

                   
        
            });
            options.add(option);



        }

          

    })

                 // Menubar.Help
                 var container = new UI.Panel();
                 container.setClass('menu');
    
                 var title = new UI.Panel();
                 title.setClass('title');
                 title.setTextContent('Graph');
                 container.add(title);
    
                 var options = new UI.Panel();
                 options.setClass('options');
                 container.add(options);
    
    
                 var option = new UI.Row();
                 option.setClass('option');
                 option.setTextContent('Hide Graph');
    
                 option.onClick(function() {
                     d3.select('#charts')
                         .style('display','none');
                         
                 });
                 options.add(option);
 



    return container;
   
};
