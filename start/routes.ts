
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/dashboard', async ({ view }) => {
  return view.render('auth/dashboard')
}).middleware('auth')

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
})
Route.post('/signup', 'AuthController.signup')
Route.get('/getAll', 'AuthController.index')


Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
})
Route.post('/login', 'AuthController.signin')
Route.post('/logout', 'AuthController.signout')





Route.post('/post', 'PostsController.show')
Route.get('/post', 'PostsController.index')

