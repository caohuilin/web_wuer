const CommentModule = React.createClass({
    mixins: [WildReactMixin],
    getInitialState(){
      return {cri:"",criList:[]}
    },
    componentWillMount(){
        this.bindAsArray(Comment, "criList")
    },
    handleChange2(e){
        this.setState({
            cri: e.target.value
        });
    },
    handleSubmit2(e){
        e.preventDefault();
        if(this.state.cri !== "") {
            Comment.push({topicalTime:this.props.topical.time,name: this.props.user.name, cri: this.state.cri});
            this.setState({cri: ""});
            console.log("评论成功");
        }
    },
    render(){
        const list = this.state.criList.filter((c,i)=>c.topicalTime === this.props.topical.time).map((c,i)=>{
           return (
               <li>
                   <span className="user">{c.name}:</span>{c.cri}
               </li>
           )
        });
        return (
            <div className="comment">
                <ul className="commentList">
                    {list}
                </ul>
                <form className="addComment" onSubmit={this.handleSubmit2}>
                    <textarea value={this.state.cri} onChange={this.handleChange2} className="form-control" rows="1"/>
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
    componentWillMount(){
        this.bindAsArray(Topical, "topicalList");
    },
    handleChange1(e){
        this.setState({
            topical: e.target.value
        });
    },
    handleChange3(e){
        this.setState({
            topicalTheme: e.target.value
        });
    },
    handleSubmit1(e){
        e.preventDefault();
        if(this.state.topical !== "") {
            Topical.push({topicalTheme:this.state.topicalTheme,userName: this.props.user.name, topical: this.state.topical,time:Wilddog.ServerValue.TIMESTAMP});
            // const topicalOne = Topical.child(this.state.topicalTheme);
            // topicalOne.set({topicalTheme:this.state.topicalTheme,name: this.props.user.name, topical: this.state.topical});
            this.setState({topical: "",topicalTheme:""});
            console.log("发起成功");
        }
    },

    render(){
        const list = this.state.topicalList.map((t, i)=> {
            return (
                <li>
                    <div className="head">
                        <div><span className="user">{t.name}</span>发起话题:{t.topicalTheme}</div>
                        {t.topical}
                    </div>
                    <CommentModule topical={t} user={this.props.user}/>
                </li>
            )
        });
        return (
            <div className="section5">
                <form className="addTopical" onSubmit={this.handleSubmit1}>
                    <h3>近期有什么好玩的事情,快和小伙伴们一起讨论吧</h3>
                    <label htmlFor="topicalTheme">主题</label><textarea value={this.state.topicalTheme} onChange={this.handleChange3} className="form-control"
                              rows="1"/>
                    <textarea value={this.state.topical} onChange={this.handleChange1} className="form-control"
                              rows="3"/>
                    <button type="submit" className="btn btn-default">发起</button>
                </form>
                <ul className="topicalList">
                    {list}
                </ul>
            </div>
        )
    }
});