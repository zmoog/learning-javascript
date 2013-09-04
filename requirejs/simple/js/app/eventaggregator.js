define(['puppet'], function (Puppet) {
	
	console.log('puppet', Puppet);

	return new Puppet.EventAggregator();
});