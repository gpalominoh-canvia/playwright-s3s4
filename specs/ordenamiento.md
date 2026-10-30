# Plan de pruebas: ordenamiento del catálogo

## Application Overview

Validar en SauceDemo (Swag Labs), con standard_user / secret_sauce, que el catálogo de seis productos se ordena correctamente por nombre ascendente y descendente, y por precio ascendente y descendente. Comprobar el orden visible de nombres y precios, el indicador seleccionado y la actualización al cambiar el criterio. Los casos parten de una sesión nueva y un catálogo en su estado inicial.

## Test Scenarios

### 1. Ordenamiento del catálogo de productos

**Seed:** `seed.spec.ts`

#### 1.1. Ordenar el catálogo alfabéticamente de A a Z

**File:** `tests/catalogo/ordenamiento-nombre-az.spec.ts`

**Steps:**
  1. Abrir https://www.saucedemo.com en una sesión nueva, sin datos de sesión previos.
    - expect: Se muestra el formulario de inicio de sesión.
  2. Ingresar standard_user y secret_sauce y enviar el formulario.
    - expect: Se inicia sesión y se muestra la página Products del catálogo.
  3. Comprobar el catálogo inicial antes de cambiar el criterio.
    - expect: Se muestran exactamente seis productos.
    - expect: El selector de ordenamiento muestra Name (A to Z) como opción seleccionada.
    - expect: Los nombres aparecen en este orden: Sauce Labs Backpack; Sauce Labs Bike Light; Sauce Labs Bolt T-Shirt; Sauce Labs Fleece Jacket; Sauce Labs Onesie; Test.allTheThings() T-Shirt (Red).
  4. Seleccionar Name (A to Z) en el selector de ordenamiento.
    - expect: El catálogo permanece en orden alfabético ascendente: Sauce Labs Backpack; Sauce Labs Bike Light; Sauce Labs Bolt T-Shirt; Sauce Labs Fleece Jacket; Sauce Labs Onesie; Test.allTheThings() T-Shirt (Red).
    - expect: Name (A to Z) permanece seleccionado.
    - expect: Cada producto conserva su precio y no se agrega ni se elimina ningún producto.

#### 1.2. Ordenar el catálogo alfabéticamente de Z a A

**File:** `tests/catalogo/ordenamiento-nombre-za.spec.ts`

**Steps:**
  1. Abrir SauceDemo en una sesión nueva e iniciar sesión con standard_user / secret_sauce.
    - expect: Se muestra la página Products con los seis productos.
  2. Seleccionar Name (Z to A) en el selector de ordenamiento.
    - expect: El selector indica Name (Z to A) como opción seleccionada.
    - expect: Los productos aparecen en este orden: Test.allTheThings() T-Shirt (Red); Sauce Labs Onesie; Sauce Labs Fleece Jacket; Sauce Labs Bolt T-Shirt; Sauce Labs Bike Light; Sauce Labs Backpack.
    - expect: El catálogo conserva los seis productos y sus precios.

#### 1.3. Ordenar el catálogo por precio de menor a mayor

**File:** `tests/catalogo/ordenamiento-precio-ascendente.spec.ts`

**Steps:**
  1. Abrir SauceDemo en una sesión nueva e iniciar sesión con standard_user / secret_sauce.
    - expect: Se muestra la página Products con los seis productos.
  2. Seleccionar Price (low to high) en el selector de ordenamiento.
    - expect: El selector indica Price (low to high) como opción seleccionada.
    - expect: Los precios aparecen en orden no descendente: $7.99, $9.99, $15.99, $15.99, $29.99, $49.99.
    - expect: Los productos aparecen en este orden: Sauce Labs Onesie ($7.99); Sauce Labs Bike Light ($9.99); Sauce Labs Bolt T-Shirt ($15.99); Test.allTheThings() T-Shirt (Red) ($15.99); Sauce Labs Backpack ($29.99); Sauce Labs Fleece Jacket ($49.99).
    - expect: Los dos productos de $15.99 se mantienen visibles y el total sigue siendo de seis productos.

#### 1.4. Ordenar el catálogo por precio de mayor a menor

**File:** `tests/catalogo/ordenamiento-precio-descendente.spec.ts`

**Steps:**
  1. Abrir SauceDemo en una sesión nueva e iniciar sesión con standard_user / secret_sauce.
    - expect: Se muestra la página Products con los seis productos.
  2. Seleccionar Price (high to low) en el selector de ordenamiento.
    - expect: El selector indica Price (high to low) como opción seleccionada.
    - expect: Los precios aparecen en orden no ascendente: $49.99, $29.99, $15.99, $15.99, $9.99, $7.99.
    - expect: Los productos aparecen en este orden: Sauce Labs Fleece Jacket ($49.99); Sauce Labs Backpack ($29.99); Sauce Labs Bolt T-Shirt ($15.99); Test.allTheThings() T-Shirt (Red) ($15.99); Sauce Labs Bike Light ($9.99); Sauce Labs Onesie ($7.99).
    - expect: Los dos productos de $15.99 se mantienen visibles y el total sigue siendo de seis productos.

#### 1.5. Actualizar el catálogo al cambiar varias veces de criterio

**File:** `tests/catalogo/cambiar-criterio-ordenamiento.spec.ts`

**Steps:**
  1. Abrir SauceDemo en una sesión nueva e iniciar sesión con standard_user / secret_sauce.
    - expect: Se muestra la página Products con los seis productos.
  2. Seleccionar Price (low to high) y verificar la lista; luego seleccionar Name (Z to A).
    - expect: Tras seleccionar Price (low to high), Sauce Labs Onesie ($7.99) aparece primero y Sauce Labs Fleece Jacket ($49.99) al final.
    - expect: Tras cambiar a Name (Z to A), el primer producto es Test.allTheThings() T-Shirt (Red) y el último es Sauce Labs Backpack.
    - expect: El selector refleja en cada paso el criterio seleccionado y el cambio actualiza el orden sin recargar la página ni alterar el contenido del catálogo.
  3. Seleccionar Name (A to Z) y finalmente Price (high to low).
    - expect: Con Name (A to Z), Sauce Labs Backpack aparece primero y Test.allTheThings() T-Shirt (Red) al final.
    - expect: Con Price (high to low), Sauce Labs Fleece Jacket ($49.99) aparece primero y Sauce Labs Onesie ($7.99) al final.
    - expect: Cada selección reemplaza el orden anterior; no se acumulan filtros ni se duplican productos.
