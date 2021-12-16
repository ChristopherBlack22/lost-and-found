User.create(name: "Morpheus", email: "morph@matrix.com")
User.create(name: "Neo", email: "neo@matrix.com")
User.create(name: "Trinity", email: "trinny@matrix.com")

Item.create(name: "Sock", description: "White with purple and green logo and strips. Looks well worn. Possibly left foot. Unable to reach.", image_url: "https://www.flickr.com/photos/lwr/27355508/", last_location: "In a tree at the north entrance to the park. Above the wooden bench.", last_date: DateTime.new(2021, 12, 3, 9), lost_status: false, found_status: true, user_id: 1)
Item.create(name: "Wallet", description: "Leather. Light brown and grey with cartoon drawing. Contains 3 bank cards and photo of ginger cat.", image_url: "https://ghibli.store/wp-content/uploads/2020/04/productimage208366759_2nd.jpg" , last_location: "Held it as I made a purchase at Fake Shop before walking up the canal to Imaginary Road where I noticed it was missing.", last_date: DateTime.new(2021, 12, 15, 15), lost_status: true, found_status: false, user_id: 1)
Item.create(name: "Rusty key", description: "Large key. Looks incredibly old. Believed to be iron. Maybe for an underground dungeon or a pirates chest. In my possession, please contact me.", image_url: "https://pixnio.com/free-images/2017/11/02/2017-11-02-16-38-42.jpg" , last_location: "Under the concrete railings on the first floor balcony of the Made-up Castle.", last_date: DateTime.new(2021, 12, 10, 13), lost_status: false, found_status: true, user_id: 2)
Item.create(name: "Sunglasses", description: "Oval shaped lenses. Very dark. Kind of like alien eyes. Irreplacable.", image_url: "https://media.gq-magazine.co.uk/photos/5d13a7a02059d94efaf77b7b/3:4/w_960,h_1280,c_limit/matrix-01-gq-3jun19_b.jpg" , last_location: "Photograph is of me wearing them by the phonebox on Does-Not-Exist Street. A man chased me and I believe they were dropped.", last_date: DateTime.new(2021, 12, 8, 16), lost_status: true, found_status: false, user_id: 2)

Comment.create(content: "That looks like one of my socks but I don't think it's missing. I'll check.", user_id: 3, item_id: 1)
Comment.create(content: "Definitely my sock. I will recover if still there.", user_id: 2, item_id: 1)
Comment.create(content: "Sorry. Didn't think it was mine, but worth checking.", user_id: 3, item_id: 1)
Comment.create(content: "Found a very similar wallet one day later under a car parked by the canal. Message me to confirm it is yours.", user_id: 3, item_id: 2)
Comment.create(content: "I am missing a key. Does it have any writing on it in an ancient lanuage?", user_id: 3, item_id: 3)
Comment.create(content: "No, but there is a strange symbol on it.", user_id: 2, item_id: 3)
Comment.create(content: "Ok. Not mine. Thanks.", user_id: 3, item_id: 3)
Comment.create(content: "I found some sunglassess in the same location. They have small diamonds on the bridge. Is that them?", user_id: 1, item_id: 4)
Comment.create(content: "Clearly not!!!", user_id: 2, item_id: 4)