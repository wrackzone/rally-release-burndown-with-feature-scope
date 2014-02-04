describe("When making a TSDay model for story acceptance when rolled up to feature",function(){
    
    var PI_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","PortfolioItem","PortfolioItem","PortfolioItem/Feature"];
    var Story_TypeHierarchy = ["PersistableObject","DomainObject","WorkspaceDomainObject",
        "Artifact","Requirement","HierarchicalRequirement","HierarchicalRequirement"];
    
    it("should calculate story acceptance by leaf estimates",function(){
        var day = Ext.create('TSDay',{});
        
        expect(day.get('leafSizeFieldName')).toEqual('LeafStoryPlanEstimateTotal');
        expect(day.get('leafAcceptedSizeFieldName')).toEqual('AcceptedLeafStoryPlanEstimateTotal');
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3});
        var snap2 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3});
        var snap3 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3});
            
        snap1.set('_TypeHierarchy',Story_TypeHierarchy);
        snap2.set('_TypeHierarchy',PI_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('leafAcceptedTotal')).toEqual(20);
        expect(day.get('leafTotal')).toEqual(50);
    });
        
    it("should calculate story acceptance by count when given count fields",function(){
        var day = Ext.create('TSDay',{
            leafAcceptedSizeFieldName: 'AcceptedLeafStoryCount',
            leafSizeFieldName: 'LeafStoryCount'
        });
        
        var snap1 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3});
        var snap2 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3});
        var snap3 = Ext.create('mockSnap',{ ObjectID:5, Project: 5,  c_PIPlanEstimate:4, 
            PlanEstimate:4, AcceptedLeafStoryPlanEstimateTotal: 10, LeafStoryPlanEstimateTotal: 25, 
            AcceptedLeafStoryCount: 2, LeafStoryCount: 3});
            
        snap1.set('_TypeHierarchy',Story_TypeHierarchy);
        snap2.set('_TypeHierarchy',PI_TypeHierarchy);
        snap3.set('_TypeHierarchy',PI_TypeHierarchy);
        
        day.addSnap(snap1);
        day.addSnap(snap2);
        day.addSnap(snap3);

        expect(day.get('leafAcceptedTotal')).toEqual(4);
        expect(day.get('leafTotal')).toEqual(6);
    });
           
 
});