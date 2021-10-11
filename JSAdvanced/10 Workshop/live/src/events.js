window.game = (function() {
    return {
        events : {
            onBeginTurn:createObserver(),
            onEncounterEnd:createObserver(),
        }
    };


    function createObserver(){
        const listeners = new Set();
        fire.subscribe=subscribe;
        fire.unsubscribe=unsubscribe;

        return fire;

        function subscribe(listener){
            listeners.add(listener);
        }

        function fire(...params){
            listeners.forEach(listener=>listener(...params) )
        }

        function unsubscribe(listener){
            listeners.delete(listener);
        }
    }
})() ;
