describe('GateKeeper'.underline.bold.blue, () =>{
  let GateKeeper;

  before(() =>{
    return System.import('auth/gatekeeper')
      .then(function(m){
        GateKeeper = m;
        return;
     });
  });

  it('should sign a jwt', () =>{
    expect(GateKeeper.sign('23')).to.be.a('string');
  });

  it('should have a check admin method', () =>{
    expect(GateKeeper.CheckAdmin).to.be.a('function');
  });

  it('should have a check password method', () =>{
    expect(GateKeeper.CheckPassword).to.be.a('function');
  });

  it('should have a gatekeeper method', ()=> {
    expect(GateKeeper.Gatekeeper).to.be.a('function');
  });
});
