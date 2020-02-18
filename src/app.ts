import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import "es6-shim";
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(port) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    //this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;