ReactDOM.render((
    <Router>
        <Route path="/" component={Login} />
        <Route path="/home" component={Main} />
        <Route path="/story" component={Main} />
        <Route path="/prize" component={Main} />
        <Route path="/partner" component={Main} />
        <Route path="/say" component={Main} />
    </Router>
), document.getElementById('main'));