const Comment = React.createClass({
    mixins: [WildReactMixin],
    getInitialState(){
      return {cri:"",criList:[]}
    },
    componentDidMount(){
        const topicalOne = Topical.child(this.props.topical);
        const comment = topicalOne.child("com");
        this.bindAsArray(comment, "criList")
    },
    handleChange2(e){
        this.setState({
            cri: e.target.value
        });
    },
    handleSubmit2(e){
        e.preventDefault();
        const topicalOne = Topical.child(this.props.topical);
        const commentOne = topicalOne.child("com");
        commentOne.push({name: this.props.user.name, cri: this.state.cri});
        this.setState({cri: ""});
        console.log("评论成功");
    },
    render(){
        const list = this.state.criList.map((c,i)=>{
           return (
               <li>
                   {c.name}:{c.cri}
               </li>
           )
        });
        return (
            <div className="comment">
                {list}
                <form onSubmit={this.handleSubmit2}>
                    <textarea value={this.state.cri} onChange={this.handleChange2} className="form-control" rows="3"/>
                    <button type="submit" className="btn btn-default">评论</button>
                </form>
            </div>



        )
    }
});


const Section5 = React.createClass({
    mixins: [WildReactMixin],
    getInitialState(){
        return {topical: "", topicalList: []}
    },
    componentDidMount(){
        this.bindAsArray(Topical, "topicalList")
    },
    handleChange1(e){
        this.setState({
            topical: e.target.value
        });
    },
    handleSubmit1(e){
        e.preventDefault();
        const topicalOne = Topical.child(this.state.topical);
        topicalOne.set({name: this.props.user.name, topical: this.state.topical});
        this.setState({topical: ""});
        console.log("发起成功");
    },

    render(){
        const list = this.state.topicalList.map((t, i)=> {
            return (
                <li>
                    {t.name}发起话题{t.topical},快来参与吧
                    <Comment topical={t.topical} user={this.props.user}/>
                </li>
            )
        });
        return (
            <div className="section5">
                <form onSubmit={this.handleSubmit1}>
                    <textarea value={this.state.topical} onChange={this.handleChange1} className="form-control"
                              rows="3"/>
                    <button type="submit" className="btn btn-default">发起</button>
                </form>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
});