import * as express from 'express';
import { getRepository } from 'typeorm';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './users.dto';
import User from './users.entity';
 
class PostController implements Controller {
  public path = '/posts';
  public router = express.Router();
  private postRepository = getRepository(User);
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreatePostDto), this.modifyPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }
 
  private createPost = async (request: express.Request, response: express.Response) => {
    const postData: CreatePostDto = request.body;
    const newPost = this.postRepository.create();
    await this.postRepository.save(newPost);
    response.send(newPost);
  }
 
  private getAllPosts = async (request: express.Request, response: express.Response) => {
    const posts = await this.postRepository.find();
    response.send(posts);
  }
 
  private getPostById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const post = await this.postRepository.findOne(id);
    if (post) {
      response.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  }
 
  private modifyPost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const postData: User = request.body;
    await this.postRepository.update(id, postData);
    const updatedPost = await this.postRepository.findOne(id);
    if (updatedPost) {
      response.send(updatedPost);
    } else {
      next(new PostNotFoundException(id));
    }
  }
 
  private deletePost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.postRepository.delete(id);
    if (deleteResponse.raw[1]) {
      response.sendStatus(200);
    } else {
      next(new PostNotFoundException(id));
    }
  }
}
 
export default PostController;