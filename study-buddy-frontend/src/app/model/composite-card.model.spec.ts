import { CompositeCard } from './composite-card.model';

describe('CompositeCards', () => {
  it('should create an instance', () => {
    expect(new CompositeCard("question", "answer", "title")).toBeTruthy();
  });
});
