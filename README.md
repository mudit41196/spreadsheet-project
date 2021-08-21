#Node version

node v10.16.3
npm 6.9.0

#Command to Start

npm i
npm run start

#features developed

Column Context Menu
- add column to left
- add column to right
- sort column ascending (by string as given in assignment)
- sort column descending (by string as given in assignment)


Row Context Menu
- add row to top
- add row to bottom

Selection of elements
- on clicking cell, single element is selected
- selection of elements works Shift + left, Shift + right, Shift + up, Shift + up
- Shift + left, Shift + up will not work at first column/row of selection (start with right or bottom selection only)
- Sum of Selected Elements(only numbers) is shown at bottom right of window.

#optimizations considered

- All event handlers are declared at root level, using the concept of event delegation to avoid multiple event handlers.
- Heavy tasks like adding rows/columns etc are done aschronously using setTimeout.
- Data is stored as object for fast read and write operations {column: {}}


#Cant Cover Bonus Features

- I was not able to start with bonus features because of the time constraint. As all rounds were scheduled within 2days.