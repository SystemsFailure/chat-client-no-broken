user = {
    name: 'Eric',
    registerByName: function() {
        console.log(this.name + 'eadaad')
        console.log(this) // this=user
    }
}





let fetching = setTimeout(user.registerByName.bind(user), 500)