const Section2 = React.createClass({
    render(){
        const storyList = Story.map((story,i)=>{
            const storyImg = story.img.map((imgSrc,i)=>{
                return <li><img src={imgSrc}/></li>
            });
           return(
               <li>
                   <h3>{story.title}</h3>
                   <div className="time"><i className="fa fa-calendar" />{story.time}</div>
                   <div className="con">{story.content}</div>
                   <ul className="imgList">
                       {storyImg}
                   </ul>
               </li>
           )
        });
        return (
            <div className="section2">
                <ul>
                    {storyList}
                </ul>
            </div>
        )
    }
});