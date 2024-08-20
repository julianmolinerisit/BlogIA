const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);
