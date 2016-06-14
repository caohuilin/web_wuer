const Login = React.createClass({
    getInitialState(){
        return {
            id: '',
            successLogin:true
        }
    },
    handleSubmit(e){
        e.preventDefault();
        let loginSuccess = false;
        Users.map((user, i)=> {
            if (user.id === this.state.id) {
                console.log("登录成功");
                document.cookie = "userId:"+user.id;
                const User = userOnline.child(user.name);
                loginSuccess = true;
                User.set(Wilddog.ServerValue.TIMESTAMP);
                this.props.changeUser(user);
                this.setState({id:"",successLogin:true});
            }
        });
        if(!loginSuccess){
            console.log("输入错误,请重新输入");
            this.setState({id:"",successLogin:false});
        }
    },
    handleChange(e){
        this.setState({
            id: e.target.value
        });
    },
    render(){
        return (
            <div className="login">
                <h2>欢迎来到物二大家庭</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="loginWrong" style={css_display(!this.state.successLogin)}>输入错误,请重新输入</div>
                    <div className="form-group">
                        <label>学号:</label>
                        <input type="id" value={this.state.id} className="form-control" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>

        );
    }
});