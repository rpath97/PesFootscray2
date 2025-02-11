import http.server
import socketserver
import webbrowser
from pathlib import Path

# Configuration
PORT = 8081
DIRECTORY = Path(__file__).parent  # Uses the same directory as the script

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def do_GET(self):
        print(f"Requested path: {self.path}")
        return super().do_GET()

def run_server():
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Serving at http://localhost:{8081}")
            print("Press Ctrl+C to stop the server")
            
            # Open the webpage in the default browser
            webbrowser.open(f"http://localhost:{8081}")
            
            # Start the server
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_server() 