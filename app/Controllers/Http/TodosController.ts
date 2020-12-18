import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import  Todos from 'App/Models/Todo';
import Database from '@ioc:Adonis/Lucid/Database';

export default class TodosController {

    public async createTodo({request,response}:HttpContextContract){
        const username = request.input('username')
        const todos = request.input('todo')
        // console.log(todos)
        const todoObj=new Todos();
        todoObj.username = username
        todoObj.list = todos
        await todoObj.save()
        response.send(todoObj)
        }
    

    public async todoList({response,params}:HttpContextContract){

        const username=params.username
        const user=await Database
        .from('todos')
        .where('username', username);
        response.send(user)
    }

    public async deleteTodo({params,response}:HttpContextContract){
    const id=params.id
    await Database
    .from('todos')
    .where('id', id)
    .delete()
    response.send("Deleted")
}
}
