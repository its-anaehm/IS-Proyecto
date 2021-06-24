import { app } from './app';

app.listen(app.get('port'), () => {
    console.log(`Server is ON in port ${app.get('port')}`)
})
