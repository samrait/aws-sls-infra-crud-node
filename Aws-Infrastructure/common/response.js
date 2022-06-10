'use-strict'

class Response{
      
    constructor(){ 
        this.response = {
            statusCode: 200,
            headers: {
                "Content-Type": "text/xml"
              },
            body: 'Message has been sent'
        };
    };

    setResponse(status, body){
        this.response.statusCode = status;
        this.response.body = body;
        return this.response;
    };
}

module.exports =  Response;