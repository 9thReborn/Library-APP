import createError from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';



import indexRouter from './routes/index';
import usersRouter from './routes/users';
import connect from './config/db';


connect().then(() => {
  console.log("Connected to MongoDB")
})



const app = express();

// view engine setup
app.set('views', path.join(__dirname, "../", 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));


app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('book/home', {
    docTitle: 'BookinDom',
    limit: 5
  })
});

app.use('/BOOKS', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req:Request, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    docTitle: 'Error Page',
    path: ''
  });
});

export default app;
