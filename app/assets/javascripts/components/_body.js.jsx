var Body = React.createClass({
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
        <AllItems items={this.state.items} />
      </div>
    )
  }
});
