/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package RealReto3.Reto3.Interface;

import org.springframework.data.repository.CrudRepository;
import RealReto3.Reto3.Modelo.Cliente;
/**
 *
 * @author user
 */
public interface InterfaceCliente extends CrudRepository<Cliente,Integer> {
    
}
