//To export HighCharts to PDF using JSPDF,canvg and Html2Canvas.
//TO export HighChart to PDF all you need to add references of below files
//	Html2Canvas js library
//	canvg Js library
//	JSPdf Js library 
//	JQuery Js library
//First Create Your HighChart on Page then Create a button name as export and call below function onclick event.


 function exportChart() {
            var finalImageSrc;
            //This function will render your svg element of  HighChart to canvas Image
            render();
            $(document).ready(function () {
                html2canvas([$('#highcharts-0')[0]], {
                    //logging: true,
                    //background :'rgba(255, 0, 0, 0.5)',
                    onrendered: function (canvas) {
                        if ($('#export-image-container').length == 0)
                            $('body').append('<a id="export-image-container" download="barchart.jpg">')
                        var can3 = document.getElementById('canvas3');
                        var ctx3 = can3.getContext('2d');
                        ctx3.fillStyle = "#FFFFFF";
                        ctx3.fillRect(0, 0, 1550, 1200);
                        ctx3.drawImage(document.getElementById('canvas1'), 0, 0);
                        ctx3.drawImage(canvas, 0, 0);
                        ctx3.fillStyle = "black";
                        ctx3.font = "20px Verdana";
                        var x = 600;
                        var y = 100;
                        var lineheight = 25;
                     
                        var txt = document.getElementById('dvChartData').innerHTML;
                         //dvChartData contains chart data information, which is not part of svg element its a diffrent div.
                         // for linebreaks in canvas image i have added a below logic
                        var lines = txt.split('\n');
                        for (var i = 0; i < lines.length; i++)
                            ctx3.fillText(lines[i], x, y + (i * lineheight),3000);
                        
                        ctx3.textAlign.bold();
                        var img = can3.toDataURL("image/jpeg");
                        img = img.replace('data:image/jpeg;base64,', '')
                        finalImageSrc = 'data:image/jpeg;base64,' + img;
                        $('#export-image-container').attr('href', finalImageSrc)
			//imgData contains highchart svg's image
                        var imgData = finalImageSrc;
                        document.getElementById('canvgCanvas').style.display = 'none';
                      
                        var doc = new jsPDF("l","mm","a4","");
                       
                        doc.setFontSize(40);
                        doc.text(x, y, txt);
                        doc.addImage(imgData, 'JPEG', -30, 5, 240, 110);
                        doc.save("BFPChart.pdf");
                     //To reload your highchart
                        window.location.reload();
                        
                    }
                });
            });
        }
        
        var context;
	function render() {
	//canvas1 is your canvas where your high chart is rendered as image after this function call
	        var c = document.getElementById('canvas1');
	        c.width = '742';
	        c.height = '442';
	        if (context) c.getContext = context;
	        canvg();
       }

	   
