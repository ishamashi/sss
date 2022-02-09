var IMAGE_HOST = "http://mobile-prisma-api.com:7080/";

class Helper {
    checkErrorImg(value) {
        var srcimage2 = 'assets/images/ooh-pictures/' + value;
        var img = new Image();
        img.src = srcimage2;
        console.log('trying read image from server local', {
            url: srcimage2
        });
    
        img.onload = function () {
            console.log('image from server local found', {
                url: srcimage2
            });
        }
    
        img.onerror = function () {
            srcimage2 = IMAGE_HOST + 'image/' + value;
            console.log('trying read image from server mobile', {
                url: srcimage2
            });
            img = new Image();
            img.src = srcimage2;
    
            img.onload = function () {
                console.log('image from server mobile found', {
                    url: img.src
                });
            }
    
            img.onerror = function () {
                srcimage2 = `http://192.168.20.120:5000/image/${value}`;
                console.log('trying read image from server dev 120', {
                    url: srcimage2
                });
                img = new Image();
                img.src = srcimage2;
    
                img.onload = function() {
                    console.log('image from server dev 120 found', {
                        url: img.src
                    });
                }
    
                img.onerror = function() {
                    srcimage2 = 'assets/images/ooh-pictures/noimage.jpg';
                    img = new Image();
                    img.src = srcimage2;
                    console.log('image from server dev 120 not found', {
                        url: srcimage2
                    });
                    return srcimage2;
                }
            }
        }

        return srcimage2;
    }
}

export default new Helper;