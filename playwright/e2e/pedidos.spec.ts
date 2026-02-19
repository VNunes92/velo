import { test, expect } from '@playwright/test'

test('Consultar um pedido aprovado', async ({ page }) => {
  /// Padrão AAA do playwright - Arrange, Act, Assert
  /// Preparar, Agir, Verificar
  
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  // Act
  /// Maneiras diferentes de encontrar o elemento
  //await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-BVOH08')
  //await page.getByLabel('Número do Pedido').fill('VLO-BVOH08')
  //await page.getByPlaceholder('Ex: VLO-ABCD10').fill('VLO-BVOH08')
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-BVOH08')
  await page.getByTestId('search-order-button').click()
  // Assert
  await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000})
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-BVOH08')
  await expect(page.getByTestId('order-result-status')).toBeVisible({timeout: 10000})
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})