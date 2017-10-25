import json
from http.server import *
import makeahaiku_server
import sample_server


def processImage(str_img):
    return str_img


class GetHandler(BaseHTTPRequestHandler):

    def do_POST(self):

        print("*post received")

        content_len = int(self.headers['Content-Length'])
        post_body = self.rfile.read(content_len)

        post_data = str(post_body.decode('utf-8'))
        json_data = json.loads(post_data)

        words = json_data["words"]

        print(words)


        if self.path.endswith("/test"):
            answer_json = json.dumps("ok")

        elif self.path.endswith("/haikus"):

            # haikus = words
            answer = makeahaiku_server.main(words)
            answer_json = json.dumps(answer)

        elif self.path.endswith("/hsue"):

            # haikus = words
            answer = sample_server.main(words, 100)
            answer_json = json.dumps(answer)

        elif self.path.endswith("/save"):

            # haikus = words
            makeahaiku_server.save_haiku(words)
            print("saved")
            answer = "saved"
            answer_json = json.dumps(answer)

        else:

            print("bad petition")
            return



        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        #self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")
        self.end_headers()

        json_response = {"data": answer_json};
        json_response = json.dumps(json_response)
        
        self.wfile.write(bytes(json_response, 'utf-8'))

        print("*answer sent")



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
    