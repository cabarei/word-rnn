import json
from http.server import *
import makeahaiku_server


def processImage(str_img):
    return str_img


class GetHandler(BaseHTTPRequestHandler):

    def do_POST(self):

        print("post received!")
      
        if self.path.endswith("/makehaikus"):

            content_len = int(self.headers['Content-Length'])
            post_body = self.rfile.read(content_len)

            post_data = str(post_body.decode('utf-8'))
            json_data = json.loads(post_data)

            words = json_data["words"]


            # haikus = words
            haikus = makeahaiku_server.main(words)
            haikus_json = json.dumps(haikus)


            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            #self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")
            self.end_headers()

            json_response = {"haikus": haikus_json};
            json_response = json.dumps(json_response)
            
            self.wfile.write(bytes(json_response, 'utf-8'))

            print("sending answer")



if __name__ == "__main__":

    print('Starting server at http://0.0.0.0:8080')

    HandlerClass = GetHandler
    ServerClass = HTTPServer

    protocol = "HTTP/1.0"
    host = "0.0.0.0"
    port = 8080

    HandlerClass.protocol_version = protocol
    server_address = (host, port)

    httpd = ServerClass(server_address, HandlerClass)
    httpd.serve_forever()
    