
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})
// Route.get('/checkLogin','AuthCOntroller.checkLogin')

Route.post('/register', 'AuthController.register')

Route.post('/login', 'AuthController.login')

Route.post('/logout','AuthController.logout')

Route.group(()=>{

Route.post('/createtodo','TodosController.createTodo')

Route.get('/todoList/:username','TodosController.todoList')

Route.delete('/deleteTodo/:id','TodosController.deleteTodo')

Route.get('/dashboard',async({response,auth}:HttpContextContract)=>{
 response.send(auth.user)})
}).middleware('auth')


// Route.get('/dashboard/:id',async({request,response,auth,params}:HttpContextContract)=>{
//   console.log(request.header('authorization')?.split(' ')[1])
//  response.send( auth.user?.id ==params.id)
// }).middleware('auth')