import mongoose from './connection'
import User from '../models/User'
import Submission from '../models/Submission'
import Like from '../models/Like'

User.remove({}, (err) => {
  if(err) console.error(err)
  User.register(
    new User({username: 'jellis'}),
    'password',
    (err, user) => {
      if(err) console.error(err)
      Submission.remove({}, (err) => {
        if(err) console.error(err)
        Submission.create({
            haiku: {
              lineOne: 'Keep straight down this block,',
              lineTwo: 'Then turn right where you will find',
              lineThree: 'A peach tree blooming.'
            },
            _user: user,
            location: {
              type: 'Point',
              coordinates: [-71.422222, 41.823611]
            }
          }, (err, submission) => {
            if(err) console.error(err)
            process.exit()
          })
      })
    })
})
