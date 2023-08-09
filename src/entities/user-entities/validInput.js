class ValidInput {
    // constructor(name=null, email=null, password=null) {
    //     this.user_name = name
    //     this.email = email
    //     this.password = password
    // }
    validation_name(name)
    {
        console.time("timing foo")
        if(name.length > 102) {
            console.log('Name is very long (more -> 102 symbols In the world dont exist name more 102 symbols now!)')
            console.log('Name is very long (more -> 102 symbols In the world dont exist name more 102 symbols now!)')
            alert(`name : ${name} is very long (more -> 102 symbols. In the world dont exist name more 102 symbols in this time!)`)
            return false
        } else {
            let result = /^[a-zA-Z ]+$/.test(name);
            return result === true;
        }
    }
    validation_email()
    {

    }
    validation_password()
    {

    }
}

export default ValidInput
