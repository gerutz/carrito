
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import styles from './styles';

const node = document.getElementById('content');



class SimpleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: [
        {
          id: 1,
          nombre: 'Harry potter',
          precio: 10,
          cantidad : 0
        },
        {
          id: 2,
          nombre: 'Indiana Jones',
          precio:15,
          cantidad: 0

        },
        {
          id: 3,
          nombre: 'Star Wars',
          precio: 20,
          cantidad: 0
        },
        {
          id: 4,
          nombre: 'La venganza de los Teletubbies',
          precio: 30,
          cantidad:0
        }
      ],
      carrito: []
    };
  }

  onAgregar(id, cantidad) {
    const articulo = this.state.stock.find((producto) => producto.id === id);
    articulo.cantidad = cantidad;
    const nuevoCarrito = this.state.carrito.concat(articulo);
    const nuevoStock = this.state.stock.filter((producto) => producto.id !== id);
    console.log(articulo);


    this.setState({ stock: nuevoStock, carrito: nuevoCarrito });
  }

  onRemover(id) {
    const articulo = this.state.carrito.find((producto) => producto.id === id);
    const nuevoCarrito = this.state.carrito.filter((producto) => producto.id !== id);
    const nuevoStock = this.state.stock.concat(articulo);

    this.setState({ stock: nuevoStock, carrito: nuevoCarrito });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.leftCol}>
          <ListaProductosOfrecidos
            productos={this.state.stock}
            onAgregar={this.onAgregar.bind(this)}
          />
        </div>
        <div className={styles.rightCol}>
          <ListaProductosEnCarrito
            productos={this.state.carrito}
            onRemover={this.onRemover.bind(this)}
          />
        </div>
      </div>
    );
  }
}

class ListaProductosEnCarrito extends Component {
  static get propTypes() {
    return {
      productos: PropTypes.array.isRequired,
      onRemover: PropTypes.func.isRequired
    };
  }

  render() {
    const articulos = this.props.productos.map((producto) => {
      return (
        <ProductoCarrito
          key={producto.id}
          id={producto.id}
          nombre={producto.nombre}
          cantidad={producto.cantidad}
          precio={producto.precio}
          onOperar={this.props.onRemover}
        />
      );
    });

    return (
      <div>
        { articulos }
      </div>
    );
  }
}

class ListaProductosOfrecidos extends Component {
  static get propTypes() {
    return {
      productos: PropTypes.array.isRequired,
      onAgregar: PropTypes.func.isRequired
    };
  }

  render() {
    const articulos = this.props.productos.map((producto) => {
      return (
        <ProductoOfrecido
          key={producto.id}
          id={producto.id}
          precio={producto.precio}
          nombre={producto.nombre}
          onOperar={this.props.onAgregar}
        />
      );
    });

    return (
      <div>
        { articulos }
      </div>
    );
  }
}

class ProductoOfrecido extends Component {
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      onOperar: PropTypes.func.isRequired,
      precio: PropTypes.number.isRequired
    };
  }

  handleClick() {
    this.props.onOperar(this.props.id, this._cantidad.value);
  }

  render() {
    return (
      <div className={styles.articulo}>
        <h3>{ this.props.nombre }</h3>
        <h3>{this.props.precio} </h3>
        <input type="number" ref={(c)=>this._cantidad=c}></input>
        <button onClick={this.handleClick.bind(this)}>Agregar</button>
      </div>
    );
  }
}

class ProductoCarrito extends Component {
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      cantidad:PropTypes.string.isRequired,
      precio:PropTypes.number.isRequired,
      onOperar: PropTypes.func.isRequired
    };
  }

  handleClick() {
    this.props.onOperar(this.props.id, this.props.precio);
  }

  handleTotal(){
    let precioFinal;

    precioFinal = this.props.precio * this.props.cantidad ;

    return precioFinal;
  }

  render() {
    return (
      <div className={styles.articulo}>
        <h3>{ this.props.nombre }</h3>
        <h3>Cantidad Comprada : {this.props.cantidad} </h3>
        <h3>Precio Producto: {this.props.precio} </h3>
        <h1>Precio de Venta: {this.handleTotal()}</h1>
        <button onClick={this.handleClick.bind(this)}>Remover</button>
      </div>
    );
  }
}
ReactDOM.render(<SimpleApp />, node);
