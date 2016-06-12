const {Motion, spring} = ReactMotion;
const range = _.range;

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};
function reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

const [count, width, height] = [33, 140, 140];
// indexed by visual position
const layout = range(count).map(n => {
    const row = Math.floor(n / 5);
    const col = n % 5;
    return [width * col, height * row];
});

const Demo = React.createClass({
    getInitialState() {
        return {
            mouse: [0, 0],
            delta: [0, 0], // difference between mouse and circle pos, for dragging
            lastPress: null, // key of the last pressed component
            isPressed: false,
            order: range(count), // index: visual position. value: component key/id
            introduceWho: 0,
            introduceIs: false
        };
    },
    introduceShow(key){
        this.setState({introduceWho: key, introduceIs: true})
    },
    introduceHide(){
        this.setState({introduceIs: false})

    },

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    },

    handleTouchStart(key, pressLocation, e) {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    },

    handleTouchMove(e) {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    },

    handleMouseMove({pageX, pageY}) {
        const {order, lastPress, isPressed, delta: [dx, dy]} = this.state;
        if (isPressed) {
            const mouse = [pageX - dx, pageY - dy];
            const col = clamp(Math.floor(mouse[0] / width), 0, 2);
            const row = clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 5));
            const index = row * 5 + col;
            const newOrder = reinsert(order, order.indexOf(lastPress), index);
            this.setState({mouse: mouse, order: newOrder,introduceIs: false});
        }
    },

    handleMouseDown(key, [pressX, pressY], {pageX, pageY}) {
        this.setState({
            lastPress: key,
            isPressed: true,
            delta: [pageX - pressX, pageY - pressY],
            mouse: [pressX, pressY],
            introduceIs: false
        });
    },

    handleMouseUp() {
        this.setState({isPressed: false, delta: [0, 0]});
    },

    render() {
        const {order, lastPress, isPressed, mouse} = this.state;
        return (
            <div className="demo2">
                {order.map((_, key) => {
                    let style;
                    let x;
                    let y;
                    let introduce = null;
                    const visualPosition = order.indexOf(key);
                    if(key === this.state.introduceWho){
                        introduce = <Introduce introduceWho={this.state.introduceWho} introduceIs={this.state.introduceIs}/>;
                    }
                    if (key === lastPress && isPressed) {
                        [x, y] = mouse;
                        style = {
                            translateX: x,
                            translateY: y,
                            scale: spring(1.2, springSetting1),
                            boxShadow: spring((x - (5 * width - 50) / 2) / 15 / 3, springSetting1)
                        };
                    } else {
                        [x, y] = layout[visualPosition];
                        style = {
                            translateX: spring(x, springSetting2),
                            translateY: spring(y, springSetting2),
                            scale: spring(1, springSetting1),
                            boxShadow: spring((x - (5 * width - 50) / 2) / 15 / 3, springSetting1)
                        };
                    }
                    return (
                        <Motion key={key} style={style}>
                            {({translateX, translateY, scale, boxShadow}) =>
                                <div
                                    onMouseOver={this.introduceShow.bind(null,key)}
                                    onMouseOut={this.introduceHide}
                                    onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                                    onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                                    className="demo2-ball"
                                    style={{
                    background: `url('./public/img/head${key}.jpg') center no-repeat`,
                    backgroundSize:`cover`,
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: key === lastPress ? 99 : visualPosition,
                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                  }}
                                >
                                    {introduce}
                                </div>
                            }
                        </Motion>
                    );
                })}
            </div>
        );
    }
});

const Introduce = React.createClass({
    render(){
        var user = Users[this.props.introduceWho];
        //if(!this.props.introduceIs) return null;
        return (
            <div className="introduce slideInLeft animated" style={css_display(this.props.introduceIs)}>
                <div className="name">{user.name}</div>
                <div className="addr"><i className="fa fa-map-marker" />{user.addr}</div>
                <div className="addrNow"><i className="fa fa-location-arrow" />{user.addNow}</div>
                <div className="phone"><i className="fa fa-phone" />{user.phone}</div>
                <div className="qq"><i className="fa fa-qq" />{user.qq}</div>
            </div>
        )
    }
});


const Section4 = React.createClass({
    render(){
        return (
            <div className="section4">
                <Demo />
            </div>
        )
    }
});