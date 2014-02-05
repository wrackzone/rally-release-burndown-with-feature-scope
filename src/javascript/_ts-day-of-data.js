/**
 * a calculator for each day of data,
 * given a snap for that day, will calculate a
 * ** baseline of total value of a given field
 * 
 * assumes that each individual snap represents one unique item
 */
 
 Ext.define('TSDay',{
    extend: 'Ext.data.Model',
    group_totals: {},
    fields: [
        {name:'JSDate',type:'date',defaultValue:new Date()},
        {name:'piSizeFieldName',type:'string',defaultValue:'c_PIPlanEstimate'}, /* the name of the field with a value to add (or count), remember the c_! */
        {name:'piSizeTotal',type:'number',defaultValue:0},
        {name:'wpSizeFieldName',type:'string',defaultValue:'PlanEstimate'},
        {name:'wpSizeTotal',type:'number',defaultValue:0},
        {name:'wpAcceptedTotal',type:'number',defaultValue:0},
        {name:'leafSizeFieldName',type:'string',defaultValue:'LeafStoryPlanEstimateTotal'},
        {name:'leafAcceptedSizeFieldName',type:'string',defaultValue:'AcceptedLeafStoryPlanEstimateTotal'},
        {name:'leafAcceptedTotal',type:'number',defaultValue:0}, /* doesn't care about feature */
        {name:'leafUnacceptedTotal',type:'number',defaultValue:0}, /* cares about feature */
        {name:'piUnacceptedTotal',type:'number',defaultValue:0}, /* cares about feature */
        {name:'leafTotal',type:'number',defaultValue:0}
    ],
    constructor: function(data) {
        this.group_totals = {};
        this.callParent(arguments);
    },
    /**
     * Given a single lookback snapshot, aggregate data
     * @param {} snap
     */
    addSnap: function(snap){
        var record_type_hierarchy = snap.get('_TypeHierarchy');
        if ( !record_type_hierarchy || Ext.Array.indexOf(record_type_hierarchy,'PortfolioItem') !== -1 ) {
            this._updatePIData(snap);
        }
        if ( !record_type_hierarchy || 
            Ext.Array.indexOf(record_type_hierarchy,'HierarchicalRequirement') !== -1 || 
            Ext.Array.indexOf(record_type_hierarchy,'Defect') !== -1 ) {
            
            this._updateWPData(snap);
        }
    },
    _updatePIData:function(snap){
        var pi_total = this.get('piSizeTotal');
        var leaf_total = this.get('leafTotal');
        var leaf_acceptance_total = this.get('leafAcceptedTotal');
        var leaf_unaccepted_total = this.get('leafUnacceptedTotal');
        var pi_unaccepted_total = this.get('piUnacceptedTotal');
        
        var pi_field_name = this.get('piSizeFieldName');
        var leaf_size_field_name = this.get('leafSizeFieldName');
        var leaf_accepted_size_field_name = this.get('leafAcceptedSizeFieldName');
        
        var percent_done = snap.get('PercentDoneByStoryPlanEstimate');
        var pi_value_in_snap = 0;
        var leaf_value_in_snap = 0;
        var leaf_accepted_value_in_snap = 0;

        if ( pi_field_name === "Count" ) {
            pi_value_in_snap = 1;
        } else {
            if (Ext.isNumber(snap.get(pi_field_name))) {
                pi_value_in_snap = snap.get(pi_field_name);
            }
        }
        if (Ext.isNumber(snap.get(leaf_size_field_name))){
            leaf_value_in_snap = snap.get(leaf_size_field_name);
        }
        if (Ext.isNumber(snap.get(leaf_accepted_size_field_name))){
            leaf_accepted_value_in_snap = snap.get(leaf_accepted_size_field_name);
        }

        pi_total = pi_total + pi_value_in_snap;
                
        if ( percent_done < 1 ) {
            leaf_unaccepted_total = leaf_unaccepted_total + leaf_value_in_snap;
            pi_unaccepted_total = pi_unaccepted_total + pi_value_in_snap;
        }
        
        leaf_total = leaf_total + leaf_value_in_snap;
        leaf_acceptance_total = leaf_acceptance_total + leaf_accepted_value_in_snap;
        this.set('piSizeTotal',pi_total);
        this.set('leafTotal',leaf_total);
        this.set('leafAcceptedTotal',leaf_acceptance_total);
        this.set('piUnacceptedTotal',pi_unaccepted_total);
        this.set('leafUnacceptedTotal',leaf_unaccepted_total);
    },
    _updateWPData:function(snap){
        var wp_total = this.get('wpSizeTotal');
        var wp_accepted_total = this.get('wpAcceptedTotal');
        var wp_field_name = this.get('wpSizeFieldName');
        
        var value_in_snap = 0;
        if ( wp_field_name === "Count" ) {
            value_in_snap = 1;
        } else {
            if (Ext.isNumber(snap.get(wp_field_name))) {
                value_in_snap = snap.get(wp_field_name);
            }
        }
        wp_total = wp_total + value_in_snap;
        this.set('wpSizeTotal',wp_total);

        if ( snap.get('ScheduleState') && snap.get('ScheduleState') == "Accepted" ) {
            wp_accepted_total = wp_accepted_total + value_in_snap;
            this.set('wpAcceptedTotal',wp_accepted_total);
        }
    }
    
 });
