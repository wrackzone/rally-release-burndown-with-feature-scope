describe("When making a TSDay model",function(){
    it("should define default values",function(){
        var day = Ext.create('TSDay',{});
        
        expect(day.get('piSizeFieldName')).toEqual('c_PIPlanEstimate');
        expect(day.get('piSizeTotal')).toEqual(0);
        expect(day.get('JSDate')).not.toBe(null);
    });
    
    it("should accept value settings",function(){
        var today = new Date();
        
        var day = Ext.create('TSDay',{
            piSizeFieldName:'John',
            piSizeTotal: 25,
            JSDate: today
        });
        
        expect(day.get('piSizeFieldName')).toEqual('John');
        expect(day.get('piSizeTotal')).toEqual(25);
        expect(day.get('JSDate')).toEqual(today);
    });
    
    it("should add a snapshot",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_PIPlanEstimate'
        });
        
        var snap = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:10 });
        
        day.addSnap(snap);
        
        expect(day.get('piSizeTotal')).toEqual(10);
    });
    
    it("should add several snapshots",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_PIPlanEstimate'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7 });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9 });
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('piSizeTotal')).toEqual(20);
    });
    
        
    it("should calculate by count",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'Count'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7 });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9 });
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('piSizeTotal')).toEqual(3);
    });
    
    it("should add snapshots with missing values",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_Effort'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, Blocked:true, c_Effort: 5 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, Blocked:true , c_Effort: ""});
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, Blocked:false });
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('piSizeTotal')).toEqual(5);
       
    });
});