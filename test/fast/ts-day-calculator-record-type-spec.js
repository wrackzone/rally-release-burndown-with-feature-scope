describe("When making a TSDay model for multiple record types",function(){
    
    var PI_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","PortfolioItem","PortfolioItem","PortfolioItem/Feature"];
    var Story_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","Requirement","HierarchicalRequirement","HierarchicalRequirement"];
    
    it("should add a snapshot with correct type array",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_PIPlanEstimate'
        });
        
        var snap = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:10});
        snap.set('_TypeHierarchy',PI_TypeHierarchy);
        day.addSnap(snap);
        
        expect(day.get('piSizeTotal')).toEqual(10);
    });
    
    it("should not add to PI data when it is a story",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_PIPlanEstimate'
        });
        
        var snap = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:10});
        snap.set('_TypeHierarchy',Story_TypeHierarchy);
        day.addSnap(snap);
        
        expect(day.get('piSizeTotal')).toEqual(0);
    });
    
    it("should add several snapshots with different types",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_PIPlanEstimate'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7 });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9 });
        
        snap1.set('_TypeHierarchy',PI_TypeHierarchy);
        snap2.set('_TypeHierarchy',Story_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('piSizeTotal')).toEqual(13);
    });
           
    it("should calculate by count when given different record types",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'Count'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7 });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9 });
        
        snap1.set('_TypeHierarchy',PI_TypeHierarchy);
        snap2.set('_TypeHierarchy',Story_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('piSizeTotal')).toEqual(2);
    });
    
               
    it("should calculate by count for both types when given different record types and fields",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'Count',
            wpSizeFieldName:'Count'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7 });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9 });
        
        snap1.set('_TypeHierarchy',PI_TypeHierarchy);
        snap2.set('_TypeHierarchy',Story_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('piSizeTotal')).toEqual(2);
        expect(day.get('wpSizeTotal')).toEqual(1);
    });
    
    it("should calculate by size for both types when given different record types and fields",function(){
        var day = Ext.create('TSDay',{
            piSizeFieldName:'c_PIPlanEstimate',
            wpSizeFieldName:'PlanEstimate'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5, c_PIPlanEstimate:4, PlanEstimate: 10 });
        var snap2 = Ext.create('mockSnap',{ ObjectID:6, Project: 5, c_PIPlanEstimate:7, PlanEstimate: 15 });
        var snap3 = Ext.create('mockSnap',{ ObjectID:7, Project: 5, c_PIPlanEstimate:9, PlanEstimate: 17 });
        
        snap1.set('_TypeHierarchy',PI_TypeHierarchy);
        snap2.set('_TypeHierarchy',Story_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('piSizeTotal')).toEqual(13);
        expect(day.get('wpSizeTotal')).toEqual(15);
    });

});