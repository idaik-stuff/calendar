<template>
  <div id="app">        
      <Calendar
            language="es"
            render-style="background"
            :enable-range-selection="true"
            :data-source="dataSource"
            :enable-context-menu="true"
            :context-menu-items="contextMenuItems"
            @mouse-on-day="mouseOnDay" 
            @mouse-out-day="mouseOutDay"
            @select-range="selectRange">
  </Calendar>
  
<b-modal :title="currentId != null ? 'Editar evento' : 'Añadir evento'" ok-title="Guardar" v-model="show" @ok="saveEvent">
    <form class="form-horizontal">
      <div class="form-group row">
        <label for="event-name" class="col-sm-2 control-label">Nombre</label>
        <div class="col-sm-10">
          <input id="event-name" type="text" class="form-control" v-model="currentName" />
        </div>
      </div>
      <div class="form-group row">
        <label for="event-location" class="col-sm-2 control-label">Notas</label>
        <div class="col-sm-10">
          <input id="event-location" type="text" class="form-control" v-model="currentLocation" />
        </div>
      </div>
      <div class="form-group row">
        <label for="min-date" class="col-sm-2 control-label">Fechas</label>
        <div class="col-sm-10">
          <div class="input-group input-daterange">
            <input id="min-date" type="date" class="form-control" v-model="currentStartDate" />
            <div class="input-group-prepend input-group-append">
              <div class="input-group-text">a</div>
            </div>
            <input type="date" class="form-control" v-model="currentEndDate" />
          </div>
        </div>
      </div>
    </form>
  </b-modal>

  </div>
</template>

<script>
import Calendar from 'v-year-calendar'

//IIB
import 'v-year-calendar/locales/v-year-calendar.es'

import moment from 'moment'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

//IIB ini-Firebse
import * as firebase from 'firebase/app'
import 'firebase/database'

let config = {
   //Datos de configuración
    apiKey: "AIzaSyB6LgZ0e26Xjt1VdYdQIquY2Imdc2WgRiY",
    authDomain: "takida-calendar.firebaseapp.com",
    databaseURL: "https://takida-calendar.firebaseio.com",
    projectId: "takida-calendar",
    storageBucket: "takida-calendar.appspot.com",
    messagingSenderId: "943694385020",
    appId: "1:943694385020:web:e649804818dd9550a75ef9"
}

let app = firebase.initializeApp(config);

let reservas_db = app.database().ref("reservas")

//IIB fin firebase

export default {
  name: 'App',
  components: {
    Calendar
  },
  data: function() {
    return {
      show: false,
      dataSource: [],
      currentId: null,
      currentStartDate: null,
      currentEndDate: null,
      currentName: null,
      currentLocation: null,
      tooltip: null,
      contextMenuItems: [
        {
          text: "Actualizar",
          click: evt => {
            this.currentId = evt.id;
            //IIB Cabio formato en fecha
            this.currentStartDate = moment(evt.startDate).format('YYYY-MM-DD');
            this.currentEndDate = moment(evt.endDate).format('YYYY-MM-DD');
            this.currentName = evt.name;
            this.currentLocation = evt.location;
            this.show = true;
          }
        },
        {
          text: "Borrar",
          click: evt => {
            this.reservas = this.reservas.filter(item => item.id != evt.id);
          }
        }
      ]
    };
  },
  created: function() {
    let self = this;
    reservas_db.on("value", function(snapshot) {
      let reservas = snapshot.val().map(reserva => Object.assign({}, reserva, {
              startDate: new Date(Date.parse(reserva.startDate)),
              endDate: new Date(Date.parse(reserva.endDate))
            }));
      console.log("EVENTS UPDATED", reservas);
      self.dataSource = reservas;
    });
  },
  methods: {
    //ini-IIB Tooltip
    mouseOnDay: function(e) {
      if (e.events.length > 0) {
        var content = '';

        for (var i in e.events) {
          content += '<div class="event-tooltip-content">'
            + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
            + '<div class="event-details">' + e.events[i].location + '</div>'
            + '</div>';
        }

        if (this.tooltip != null) {
          this.tooltip.destroy();
          this.tooltip = null;
        }

        this.tooltip = tippy(e.element, {
           placement: 'right',
            content: content,
            animateFill: false,
            animation: 'shift-away',
            arrow: true
        });
        this.tooltip.show();
      }
    },
    mouseOutDay: function() {
      if (this.tooltip !== null) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    },
     //fin-IIB
    selectRange: function(e) {
      this.currentId = null;
      this.currentName = null;
      this.currentLocation = null;
      //IIB Cabio formato en fecha
      this.currentStartDate = moment(e.startDate).format('YYYY-MM-DD');
      this.currentEndDate = moment(e.endDate).format('YYYY-MM-DD');
      this.show = true;
    },
    saveEvent: function() {
      if (this.currentId == null) {
        // Add event
        let reserva = {
          startDate: new Date(this.currentStartDate),
          endDate: new Date(this.currentEndDate),
          name: this.currentName,
          location: this.currentLocation,
        };
        //db.collection('reservas').add(reserva);
        this.reservas.add(reserva);
      }
      else {
        // Update event
        var index = this.reservas.findIndex(c => c.id == this.currentId);
        this.reservas[index].startDate = this.currentStartDate;
        this.reservas[index].endDate = this.currentEndDate;
        this.reservas[index].name = this.currentName;
        this.reservas[index].location = this.currentLocation;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
