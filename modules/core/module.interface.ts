import { Container } from 'inversify';

export default interface ModuleInterface {
  init(container: Container): void;
}
