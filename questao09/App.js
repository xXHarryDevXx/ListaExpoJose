import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const PRODUTOS_MENU = [
  { id: '1', nome: 'Sanduíche', preco: 8.00 },
  { id: '2', nome: 'Suco', preco: 5.00 },
  { id: '3', nome: 'Coxinha', preco: 6.00 },
  { id: '4', nome: 'Refrigerante', preco: 4.50 },
  { id: '5', nome: 'Bolo de Chocolate', preco: 7.00 },
];

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  const formatarMoeda = (valor) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
      // Se já existe, apenas incrementa a quantidade e atualiza o subtotal
      const novoCarrinho = carrinho.map(item => 
        item.id === produto.id 
          ? { ...item, quantidade: item.quantidade + 1, subtotal: (item.quantidade + 1) * item.preco }
          : item
      );
      setCarrinho(novoCarrinho);
    } else {
      // Se não existe, cria o objeto no array
      setCarrinho([...carrinho, { ...produto, quantidade: 1, subtotal: produto.preco }]);
    }
  };

  const alterarQuantidade = (id, delta) => {
    const novoCarrinho = carrinho.map(item => {
      if (item.id === id) {
        const novaQuantidade = item.quantidade + delta;
        // Se a quantidade chegar a zero, mantemos 1 e obrigamos a usar o botão de remover
        if (novaQuantidade > 0) {
          return { ...item, quantidade: novaQuantidade, subtotal: novaQuantidade * item.preco };
        }
      }
      return item;
    });
    setCarrinho(novoCarrinho);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  // Calcula o total somando os subtotais do array de objetos
  const totalPedido = carrinho.reduce((acumulador, item) => acumulador + item.subtotal, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lanchonete Universitária</Text>

      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Cardápio</Text>
        <ScrollView style={styles.menuList}>
          {PRODUTOS_MENU.map(produto => (
            <View key={produto.id} style={styles.menuItem}>
              <View>
                <Text style={styles.menuItemName}>{produto.nome}</Text>
                <Text style={styles.menuItemPrice}>{formatarMoeda(produto.preco)}</Text>
              </View>
              <TouchableOpacity 
                style={styles.buttonAdd} 
                onPress={() => adicionarAoCarrinho(produto)}
              >
                <Text style={styles.buttonAddText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.cartContainer}>
        <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
        
        {carrinho.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Nenhum item selecionado.</Text>
          </View>
        ) : (
          <ScrollView style={styles.cartList}>
            {carrinho.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.nome}</Text>
                  <Text style={styles.cartItemSubtotal}>Subtotal: {formatarMoeda(item.subtotal)}</Text>
                </View>
                
                <View style={styles.cartItemActions}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity style={styles.qtyButton} onPress={() => alterarQuantidade(item.id, -1)}>
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantidade}</Text>
                    <TouchableOpacity style={styles.qtyButton} onPress={() => alterarQuantidade(item.id, 1)}>
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity style={styles.buttonRemove} onPress={() => removerDoCarrinho(item.id)}>
                    <Text style={styles.buttonRemoveText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Final:</Text>
          <Text style={styles.totalValue}>{formatarMoeda(totalPedido)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 10,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonAdd: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  buttonAddText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartContainer: {
    flex: 1.2,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  cartList: {
    flex: 1,
    marginBottom: 10,
  },
  cartItem: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cartItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cartItemSubtotal: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
  },
  cartItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#111827',
  },
  buttonRemove: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
  },
  buttonRemoveText: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 12,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  totalLabel: {
    color: '#D1D5DB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: 'bold',
  },
});