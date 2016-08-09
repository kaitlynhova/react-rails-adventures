var Body = React.createClass({
  handleDelete(id){
    console.log("delete this");
    var requestUrl = '/api/v1/items/' + id;
    $.ajax({
      url: requestUrl,
      type: 'DELETE',
      success:() => {
        console.log('YEAH REMOVED ITEM');
        this.removeItemClient(id);
      }
    });
  },
  handleUpdate(item){
    var requestUrl = '/api/v1/items/' + item.id;
    $.ajax({
      url: requestUrl,
      type: 'PUT',
      data: {item: item},
      success:() => {
        this.updateItems(item);
        console.log('YEAH UPDATED ITEM');
      }
    });
  },
  updateItems(item){
    var items = this.state.items.filter((i) => {return i.id != item.id});
    items.push(item);
    this.setState({items: items});
  },
  removeItemClient(id){
    var newItems = this.state.items.filter((item) => {
      return item.id != id;
    });
    this.setState({ items: newItems });
  },
  getInitialState(){
    return { items: [] }
  },
  componentDidMount(){
    console.log('Component mounted');
    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
  },
  handleSubmit(response){
    var newState = this.state.items.concat(response);
    this.setState({items: newState })
  },
  render() {
    return(
      <div>
        <NewItem handleSubmit={this.handleSubmit}/>
        <AllItems items={this.state.items.reverse()} handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
      </div>
    )
  }
});
